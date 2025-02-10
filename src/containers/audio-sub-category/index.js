/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {AudioItem, Empty} from '../../components';
import {Divider} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import {fetchAudioCategoriesAction} from '../../store/actions';
import {IconButton, Text} from 'react-native-paper';
import {ScreenName} from '../../navigation/screen';

const mapStateToProps = state => {
  return {
    fetching: state.audioCategoryReducers.fetching,
    data: state.audioCategoryReducers.audioCollections,
    total: state.audioCategoryReducers.totalCollections,
    error: state.audioCategoryReducers.audioCollectionError,
    audioCategories: state.audioCategoryReducers.audioCategories,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => dispatch(fetchAudioCategoriesAction(params)),
  };
};

const AudioSubCategory = ({
  route: {params},
  fetchData,
  fetching,
  navigation,
  audioCategories,
}) => {
  const subData = audioCategories.filter(
    a => a.data.category?.[0] === params.id,
  );

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
          {params.name}
        </Text>
      ),
    });
  }, [navigation, params]);

  useEffect(() => {
    // fetchData({itemPerPage: 20, page: 0});
  }, []);

  const onRefresh = () => {
    fetchData({itemPerPage: 20, page: 0});
  };

  const renderItem = ({item, index}) => (
    <AudioItem
      {...item}
      onItemPress={item => {
        navigation.navigate(ScreenName.Audio, {...item});
      }}
      onMorePress={item => console.log(item)}
    />
  );

  return (
    <FlatList
      refreshing={fetching}
      data={subData}
      onRefresh={onRefresh}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={renderItem}
      ListEmptyComponent={
        subData.length !== 0 ? null : (
          <Empty
            title="Không tìm thấy mp3"
            description="Vui lòng thử lại sau"
            icon={'folder-open'}
          />
        )
      }
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

const AudioSubCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioSubCategory);

export default AudioSubCategoryContainer;
