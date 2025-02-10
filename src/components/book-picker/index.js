/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Metrics} from '../../common';
import {IconButton} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Empty} from '../../components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  buttonGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonItem: {
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  buttonActive: {
    backgroundColor: 'black',
    borderRadius: 0,
  },
  rightBlock: {
    flexDirection: 'row',
  },
  upDown: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  pageItemContainer: {
    margin: 4,
    flexGrow: 1,
  },
  buttonPageItem: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 4,
    position: 'relative',
  },
  numberPage: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    padding: 4,
    color: 'black',
  },
  pdfContainer: {
    height: 150,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkView: {
    position: 'absolute',
    top: -14,
    right: -16,
  },
  emptyText: {
    color: '#010101',
    fontSize: 16,
  },
});

const getUrl = uri => {
  if (uri.startsWith('http') || Platform.OS !== 'ios') {
    return uri;
  }

  return 'file://' + uri;
};

const BookPicker = ({
  onDone,
  totalPage,
  source,
  isVisible,
  onChangePage,
  currentPage,
  bookmarks,
  thumbnails,
}) => {
  const [viewType, setViewType] = useState('grid');
  const {top} = useSafeAreaInsets();

  const flatListRef = useRef();

  const dataSource = useMemo(() => {
    if (viewType === 'bookmark') {
      return thumbnails.filter((_, idx) => bookmarks.includes(idx + 1));
    }
    return thumbnails;
  }, [bookmarks, thumbnails, viewType]);

  const handleChangeViewType = viewTypeState => () => {
    if (viewTypeState === viewType) {
      return;
    }
    setViewType(viewTypeState);
  };

  const handlePress = useCallback(
    page => () => {
      onDone?.();
      onChangePage?.(page);
    },
    [onChangePage, onDone],
  );

  const renderEmpty = useCallback(() => {
    // if (loading) {
    //   return (
    //     <View style={styles.emptyContainer}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <Empty
        title="Không có nội dung bookmark"
        description="Hãy bookmark những trang sách thật hay bạn nhé."
        icon="bookmark"
      />
    );
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePress(item.page)}
          style={styles.buttonPageItem}>
          <Image style={{height: 150}} height={150} source={{uri: item.uri}} />

          <Text style={styles.numberPage}>{item.page}</Text>
          {item.isBookmark ? (
            <View style={styles.bookmarkView}>
              <IconButton icon="bookmark" color="red" size={24} />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    },
    [handlePress, source],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  if (!isVisible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View
        style={[
          styles.header,
          styles.bookHeader,
          {paddingTop: Metrics.scale(8) + top},
        ]}>
        <Button title="Done" onPress={onDone} />
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.buttonItem,
              viewType === 'grid' && styles.buttonActive,
            ]}
            onPress={handleChangeViewType('grid')}>
            <IconButton
              icon="th"
              size={14}
              color={viewType === 'grid' ? '#fff' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonItem,
              viewType === 'bookmark' && styles.buttonActive,
            ]}
            onPress={handleChangeViewType('bookmark')}>
            <IconButton
              icon="bookmark"
              size={14}
              color={viewType === 'bookmark' ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        numColumns={3}
        horizontal={false}
        contentContainerStyle={styles.pageItemContainer}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        data={dataSource}
        extraData={dataSource}
        ref={flatListRef}
        disableVirtualization={false}
        keyExtractor={keyExtractor}
        // onScrollToIndexFailed={info => {
        //   const wait = new Promise(resolve => setTimeout(resolve, 500));
        //   wait.then(() => {
        //     flatListRef.current?.scrollToIndex({
        //       index: info.index,
        //       animated: true,
        //     });
        //   });
        // }}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default BookPicker;
