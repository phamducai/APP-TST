import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchBookByIdAction,
  bookmarkPageAction,
  unBookmarkPageAction,
} from '../../store/actions';
import {BOOK_BASE_URL} from '../../config';
import Pdf from 'react-native-pdf';
import {Metrics} from '../../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BookHeader, BookFooter, BookPicker} from '../../components';
import Modal from 'react-native-modal';
import _ from 'lodash';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import PdfThumbnail from 'react-native-pdf-thumbnail';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    alignContent: 'space-around',
  },
  contentContainerStyle: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: Metrics.scale(4),
    marginBottom: Metrics.scale(4),
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
  },
  bottomContainer: {
    padding: Metrics.scale(8),
    height: Metrics.scale(96),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Metrics.scale(4),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
  bookHeader: {
    zIndex: 10,
    padding: Metrics.scale(8),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.scale(50),
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: Metrics.scale(8),
    padding: Metrics.scale(16),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const getUrl = uri => {
  if (uri.startsWith('http') || Platform.OS !== 'ios') {
    return uri;
  }

  return 'file://' + uri;
};

const mapStateToProps = state => {
  return {
    fetching: state.bookReducers.currentBookFetching,
    book: state.bookReducers.currentBook,
    error: state.bookReducers.currentBookError,
    currentBookmarks:
      state.bookReducers.bookmarks?.[state.bookReducers.currentBook?.id] ?? [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBookById: id => dispatch(fetchBookByIdAction(id)),
    bookmarkPage: (bookId, page) =>
      dispatch(bookmarkPageAction({bookId, page})),
    unBookmarkPage: (bookId, page) =>
      dispatch(unBookmarkPageAction({bookId, page})),
  };
};

const BookDetail = ({
  navigation,
  route,
  fetchBookById,
  bookmarkPage,
  unBookmarkPage,
  currentBookmarks,
  fetching,
  book,
  error,
}) => {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [source, setSource] = useState({});
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [zoomLevelIndex, setZoomLevelIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (!source?.uri) {
      return;
    }
    (async () => {
      const results = await PdfThumbnail.generateAllPages(getUrl(source?.uri));
      setThumbnails(
        results.map((res, idx) => ({
          id: idx,
          page: idx + 1,
          isBookmark: currentBookmarks.includes(idx + 1),
          uri: res.uri,
        })),
      );
    })();
  }, [currentBookmarks, source?.uri]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, route]);

  useEffect(() => {
    if (!book?.id || book.id !== route.params.id) {
      fetchBookById(route.params.id);
    }
  }, [book?.id, fetchBookById, route.params.id]);

  useEffect(() => {
    if (book !== null) {
      getData();
    }
  }, [book, getData]);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    getData();
  }, [getData, zoomLevelIndex]);

  const getData = useCallback(async () => {
    const pathFile =
      RNFetchBlob.fs.dirs.CacheDir + book?.data?.book[zoomLevelIndex] + '.pdf';

    const isExistFile = await RNFS.exists(pathFile);

    try {
      setSource({
        uri: isExistFile
          ? pathFile
          : `${BOOK_BASE_URL}${book.data.book[zoomLevelIndex]}`,
        cache: true,
      });
    } catch (e) {
      return null;
    }
  }, [book, zoomLevelIndex]);

  const onDonePress = () => {
    navigation.pop();
  };

  const onPageSingleTap = () => {
    setShowHeaderFooter(!showHeaderFooter);
  };

  const onDecreaseFontSize = () => {
    if (zoomLevelIndex > 0) {
      setZoomLevelIndex(zoomLevelIndex - 1);
      setIsLoading(true);
    }
  };

  const onIncreaseFontSize = () => {
    if (zoomLevelIndex < book.data.book.length - 1) {
      setZoomLevelIndex(zoomLevelIndex + 1);
      setIsLoading(true);
    }
  };

  const handleToggleBookmark = () => {
    if (isBookmarking) {
      unBookmarkPage?.(book.id, currentPage);
    } else {
      bookmarkPage?.(book.id, currentPage);
    }
  };

  const isBookmarking = useMemo(() => {
    return currentBookmarks.includes(currentPage);
  }, [currentBookmarks, currentPage]);

  const onChangePage = () => {
    setModalVisible(true);
  };

  const handleChangePageChanged = _.debounce((page, numberOfPages) => {
    setCurrentPage(page);
  });

  const handleChangeVisible = visible => () => {
    setModalVisible(visible);
  };

  const handleLoadComplete = (numberOfPages, filePath) => {
    storeData(book.id, filePath);
    setPages(numberOfPages);
    setIsLoading(false);
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />

      <Modal
        style={{margin: 0}}
        isVisible={modalVisible}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        useNativeDriver
        animationIn="zoomIn"
        animationOut="zoomOut"
        onDismiss={handleChangeVisible(false)}>
        <BookPicker
          onDone={handleChangeVisible(false)}
          currentPage={currentPage}
          onChangePage={handleChangePageChanged}
          totalPage={pages}
          thumbnails={thumbnails}
          source={source}
          isVisible={modalVisible}
          bookmarks={currentBookmarks}
        />
      </Modal>

      <View style={styles.container}>
        {showHeaderFooter && (
          <BookHeader
            style={styles.bookHeader}
            onDone={onDonePress}
            onDecreaseFontSize={onDecreaseFontSize}
            onIncreaseFontSize={onIncreaseFontSize}
            onToggleBookmark={handleToggleBookmark}
            onChangePage={onChangePage}
            bookmarking={isBookmarking}
          />
        )}

        <Pdf
          page={currentPage}
          enablePaging
          horizontal
          spacing={2}
          source={source}
          scale={1.0}
          minScale={1.0}
          maxScale={1.0}
          onLoadComplete={handleLoadComplete}
          onPageChanged={handleChangePageChanged}
          onError={error => {
            if (error.toString() === 'Error: no pdf source!') {
              return;
            }
            if (error.toString().includes('Error: Load pdf failed')) {
              return;
            }
            if (error.toString().includes('Error: canceled')) {
              // Alert.alert('Lỗi tập tin', 'Lỗi trong quá trình xử lý tập tin');
              return;
            }
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
          onPageSingleTap={onPageSingleTap}
        />
        {showHeaderFooter && (
          <BookFooter
            pages={pages}
            style={styles.bottomContainer}
            isLoading={isLoading}
            onPageSelected={selectedIndex => {
              setCurrentPage(selectedIndex + 1);
            }}
            selectedIndex={currentPage}
          />
        )}
      </View>
    </>
  );
};

const BookContainer = connect(mapStateToProps, mapDispatchToProps)(BookDetail);

export default BookContainer;
