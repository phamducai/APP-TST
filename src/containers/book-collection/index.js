/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {BookItem, Empty} from '../../components';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  fetchBookCollectionsAction,
  getBookMarksAction,
  setBookCollectionInfoAction,
  setBookInfoAction,
} from '../../store/actions';
import {ScreenName} from '../../navigation/screen';
import RNFetchBlob from 'rn-fetch-blob';
import {CMS_RESOURCE_BASE_URL} from '../../config';
import RNFS from 'react-native-fs';

const mapStateToProps = state => {
  return {
    fetching: state.bookCollectionReducers.fetching,
    bookCollections: state.bookCollectionReducers.bookCollections,
    error: state.bookCollectionReducers.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => dispatch(fetchBookCollectionsAction(params)),
    setBookInfo: params => dispatch(setBookInfoAction(params)),
    getBookmarks: () => dispatch(getBookMarksAction()),
    setBookCollectionInfo: params =>
      dispatch(setBookCollectionInfoAction(params)),
  };
};

const BookCollection = ({
  fetchData,
  getBookmarks,
  setBookInfo,
  setBookCollectionInfo,
  fetching,
  bookCollections,
  error,
  navigation,
}) => {
  const getFilePath = fileId => RNFetchBlob.fs.dirs.CacheDir + fileId + '.pdf';

  const onDownloadFile = file => {
    const filePath = getFilePath(file);

    RNFetchBlob.config({path: filePath}).fetch(
      'GET',
      `${CMS_RESOURCE_BASE_URL}${file}`,
    );
  };

  useEffect(() => {
    if (!data.length) {
      fetchData({itemPerPage: 10, page: 0});
    }
    getBookmarks();
  }, [fetchData, getBookmarks]);

  const data = bookCollections.filter(
    bookCollection => bookCollection?.data?.includedInCollection === false,
  );

  const handlePressBook = item => async () => {
    if (item.data.isCollection) {
      const bookCollection = bookCollections.filter(b =>
        b?.data?.collection?.includes(item.id),
      );
      setBookCollectionInfo(bookCollection);
      navigation.navigate(ScreenName.Book, {...item});
    } else {
      setBookInfo(item);
      navigation.navigate(ScreenName.BookDetail, {...item});
      const isDownloaded = await getStatusDownloaded(item?.data?.book);
      if (!isDownloaded) {
        item?.data?.book?.map(bookFileId => onDownloadFile(bookFileId));
      }
    }
  };

  const getStatusDownloaded = async (bookFileIds = []) => {
    const fileExists = await Promise.all(
      bookFileIds.map(async bookFileId => {
        const pathFile = getFilePath(bookFileId);
        return await RNFS.exists(pathFile);
      }),
    );
    return fileExists.every(a => a === true);
  };

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Divider />}
      horizontal={false}
      numColumns={3}
      renderItem={({item}) => (
        <BookItem {...item} onItemPress={handlePressBook(item)} />
      )}
      ListEmptyComponent={
        data.length !== 0 ? null : (
          <Empty
            title="Không tìm thấy bài viết nào"
            description="Vui lòng thử lại sau"
            icon={'folder-open'}
          />
        )
      }
      keyExtractor={item => item.id}
    />
  );
};

const BookCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookCollection);

export default BookCollectionContainer;
