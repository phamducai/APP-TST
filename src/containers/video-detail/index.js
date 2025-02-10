import React, {useState, useLayoutEffect} from 'react';
import {IconButton, Text} from 'react-native-paper';
import YouTube from 'react-native-youtube';

const VideoDetail = ({route, navigation}) => {
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
          {route.params.title}
        </Text>
      ),
    });
  }, [navigation, route]);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);
  return (
    <YouTube
      videoId={route.params.videoId} // The YouTube video ID
      play // control playback of video with true/false
      fullscreen // control whether the video should play in fullscreen or inline
      loop // control whether the video should loop when ended
      onReady={e => setIsReady(true)}
      onChangeState={e => setStatus(e.state)}
      onChangeQuality={e => setQuality(e.quality)}
      onError={e => setError(e.error)}
      style={{alignSelf: 'stretch', height: 300}}
    />
  );
};

export default VideoDetail;
