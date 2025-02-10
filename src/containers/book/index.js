import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, View} from 'react-native';
import {BookItem, Empty} from '../../components';
import {connect} from 'react-redux';
import {
  fetchBookCollectionByIdAction,
  setBookInfoAction,
} from '../../store/actions';
import {ScreenName} from '../../navigation/screen';
import {IconButton, Text, Divider} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import {CMS_RESOURCE_BASE_URL} from '../../config';
import RNFS from 'react-native-fs';

const mapStateToProps = state => {
  return {
    fetching: state.bookCollectionReducers.currentBookCollectionFetching,
    data: state.bookCollectionReducers.currentBookCollection,
    error: state.bookCollectionReducers.currentBookCollectionError,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => dispatch(fetchBookCollectionByIdAction(id)),
    setBookInfo: params => dispatch(setBookInfoAction(params)),
  };
};

const Books = ({
  route: {params},
  fetchData,
  setBookInfo,
  data,
  fetching,
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="chevron-left"
          size={20}
          color="#fff"
          onPress={() => navigation.pop()}
        />
      ),
      headerTitle: (
        <Text style={{color: '#fff'}} maxNumOfLines={1} ellipsizeMode="tail">
          {params.data.title}
        </Text>
      ),
    });
  }, [navigation, params]);

  useEffect(() => {
    fetchData(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onRefresh = () => {
    fetchData(params.id);
  };

  const books = data ? data : [];

  const getFilePath = fileId => RNFetchBlob.fs.dirs.CacheDir + fileId + '.pdf';

  const onDownloadFile = file => {
    const filePath = getFilePath(file);

    RNFetchBlob.config({path: filePath}).fetch(
      'GET',
      `${CMS_RESOURCE_BASE_URL}${file}`,
    );
  };

  const handlePressItem = item => async () => {
    setBookInfo(item);
    navigation.navigate(ScreenName.BookDetail, {...item});
    const isDownloaded = await getStatusDownloaded(item?.data?.book);
    if (!isDownloaded) {
      item?.data?.book?.map(bookFileId => onDownloadFile(bookFileId));
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
      data={books}
      refreshing={fetching}
      onRefresh={onRefresh}
      horizontal={false}
      numColumns={3}
      renderItem={({item}) => (
        <BookItem {...item} onItemPress={handlePressItem(item)} />
      )}
      ItemSeparatorComponent={() => <Divider />}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        fetching ? null : (
          <Empty
            title="Không tìm thấy bài viết nào"
            description="Vui lòng thử lại sau"
            icon={'folder-open'}
          />
        )
      }
      onEndReached={({distanceFromEnd}) => console.log(distanceFromEnd)}
    />
  );
};

const BookContainer = connect(mapStateToProps, mapDispatchToProps)(Books);

export default BookContainer;
