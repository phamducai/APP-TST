import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {AudioItem} from '../../components';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchVideoCategoriesAction} from '../../store/actions';
import {ScreenName} from '../../navigation/screen';

const mapStateToProps = state => {
  return {
    fetching: state.videoCategoryReducers.fetching,
    data: state.videoCategoryReducers.videoCategories,
    error: state.videoCategoryReducers.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => dispatch(fetchVideoCategoriesAction(params)),
  };
};

const VideoCategory = ({fetchData, data, fetching, navigation}) => {
  // useEffect(() => {
  //   fetchData({itemPerPage: 20, page: 0});
  // }, []);

  const onRefresh = () => {
    fetchData({itemPerPage: 20, page: 0});
  };
  return (
    <FlatList
      data={data}
      refreshing={fetching}
      onRefresh={onRefresh}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => (
        <AudioItem
          {...item}
          onItemPress={item => {
            navigation.navigate(ScreenName.Videos, {...item});
          }}
          onMorePress={item => console.log(item)}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const VideoCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoCategory);

export default VideoCategoryContainer;
