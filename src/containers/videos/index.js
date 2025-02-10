import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, View} from 'react-native';
import {VideoItem, Empty} from '../../components';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchVideoCategorieByIdAction} from '../../store/actions';
import {IconButton, Text} from 'react-native-paper';
import {ScreenName} from '../../navigation/screen';

const mapStateToProps = state => {
  return {
    fetching: state.videoCategoryReducers.currentVideoFetching,
    data: state.videoCategoryReducers.currentVideo,
    error: state.videoCategoryReducers.currentVideoError,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => dispatch(fetchVideoCategorieByIdAction(id)),
  };
};

const Video = ({
  route: {params},
  fetchData,
  fetching,
  data,
  error,
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
        <Text style={{color: "#fff"}} maxNumOfLines={1} ellipsizeMode="tail">
          {params.name}
        </Text>
      ),
    });
  }, [navigation, params]);
  useEffect(() => {
    fetchData(params.id);
  }, []);
  let videos = data != null && params.videos ? params.videos : [];
  
  return (
    <FlatList
      data={videos}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <VideoItem
            {...item}
            name={item.title}
            onItemPress={item => {
              navigation.navigate(ScreenName.VideoDetail, {...item});
            }}
            onMorePress={item => console.log(item)}
          />
        );
      }}
      ListEmptyComponent={
        videos.length !== 0 ? null : (
          <Empty
            title="Không tìm thấy bài viết nào"
            description="Vui lòng thử lại sau"
            icon={'folder-open'}
          />
        )
      }
      keyExtractor={item => item.key}
    />
  );
};

const VideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Video);

export default VideoContainer;
