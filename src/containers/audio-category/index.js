/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {AudioItem} from '../../components';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchAudioCategoriesAction} from '../../store/actions';
import {ScreenName} from '../../navigation/screen';
import {Metrics} from '../../common';

const mapStateToProps = state => {
  return {
    fetching: state.audioCategoryReducers.fetching,
    // data: state.audioCategoryReducers.audioCategories,
    audioCategories: state.audioCategoryReducers.audioCategories,
    error: state.audioCategoryReducers.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => dispatch(fetchAudioCategoriesAction(params)),
  };
};

const AudioCategory = ({
  route: {params},
  fetchData,
  audioCategories,
  fetching,
  navigation,
}) => {
  useEffect(() => {
    fetchData({itemPerPage: 20, page: 0});
  }, []);

  const onRefresh = () => {
    fetchData({itemPerPage: 20, page: 0});
  };

  const data = audioCategories.filter(category => category.data.isCategory);

  const handlePressAudioItem = item => {
    const audioItems = item.audios.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        ...currentValue.audio,
      ],
      [],
    );
    if (audioItems.length) {
      return navigation.navigate(ScreenName.Audio, {...item});
    }
    navigation.navigate(ScreenName.AudioSubCategory, {...item});
  };

  return (
    <FlatList
      data={data}
      refreshing={fetching}
      onRefresh={onRefresh}
      renderItem={({item}) => (
        <AudioItem {...item} onItemPress={handlePressAudioItem} />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <Divider style={{marginStart: Metrics.scale(4)}} />
      )}
    />
  );
};

const AudioCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioCategory);

export default AudioCategoryContainer;
