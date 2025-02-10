import React, {useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {IconButton, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Metrics} from '../../common';
import {Player} from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
import {CMS_RESOURCE_BASE_URL} from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

function millisToMinutesAndSeconds(millis) {
  if (millis == -1) {
    return '0:00';
  }
  console.log(`millisToMinutesAndSeconds ${millis}`);
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const UI = withTheme(
  ({
    theme: {colors},
    currentTime,
    duration,
    item: {name},
    onPlayPress,
    onSeeking,
    playing,
  }) => {
    console.log(
      `currentTime ${currentTime} , duration = ${duration}; playing ${playing}`,
    );

    const onSlidingComplete = value => {
      console.log(`onSlidingComplete ${value * duration}`);
      onSeeking(value * duration);
    };
    return (
      <View
        style={{
          backgroundColor: colors.accent,
          padding: Metrics.scale(8),
          height: Metrics.scale(200),
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: Metrics.scale(8),
          }}>
          <Text style={{color: '#fff', fontSize: Metrics.scale(20)}}>
            {name}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <FontAwesome
            name="backward"
            size={Metrics.scale(24)}
            color={colors.primary}
          /> */}
            <IconButton
              color={colors.primary}
              icon={playing ? 'pause' : 'play'}
              size={Metrics.scale(32)}
              color={colors.primary}
              onPress={onPlayPress}
            />
            {/* <FontAwesome
            name="forward"
            size={Metrics.scale(24)}
            color={colors.primary}
          /> */}
          </View>
          <Slider
            style={{marginTop: Metrics.scale(4), flex: 1}}
            minimumValue={0}
            maximumValue={1}
            value={duration != 0 ? currentTime / duration : 0}
            minimumTrackTintColor="#f8f8f8"
            maximumTrackTintColor={colors.primary}
            onSlidingComplete={onSlidingComplete}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: Metrics.scale(16),
              width: Metrics.scale(50),
              paddingStart: Metrics.scale(8),
              alignContent: 'flex-start',
            }}>
            {millisToMinutesAndSeconds(currentTime)}
          </Text>
        </View>
      </View>
    );
  },
);

const ButtomAudioControl = () => {
  const item = useSelector(state =>
    state.playerReducers.player ? state.playerReducers.player.item : null,
  );
  const action = useSelector(state =>
    state.playerReducers.player ? state.playerReducers.player.action : null,
  );

  const sheetRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(-1);
  const [duration, setDuration] = useState(-1);
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (action === 'PLAY') {
      if (player && player.isPlaying) {
        player.stop();
      }
      if (player) {
        player.destroy();
      }

      let url = `${CMS_RESOURCE_BASE_URL}${item.audio[0]}`;

      if (item.audioId) {
        url =
          'file://' +
          RNFetchBlob.fs.dirs.DocumentDir +
          '/tosuthien/' +
          item.audioId +
          '.mp3';
      }

      let playerNew = new Player(url, {
        continuesToPlayInBackground: true,
        category: 'Ambient',
        mixWithOthers: true,
      });
      playerNew.play();
      setPlayer(playerNew);
      updateState();
    }
    if (action === 'REPLAY' && player) {
      if (player && player.isPlaying) {
        player.stop();
      }
      if (player) {
        player.destroy();
      }

      let url = `${CMS_RESOURCE_BASE_URL}${item.audio[0]}`;

      if (item.audioId) {
        url =
          'file://' +
          RNFetchBlob.fs.dirs.DocumentDir +
          '/tosuthien/' +
          item.audioId +
          '.mp3';
      }

      let playerNew = new Player(url, {
        continuesToPlayInBackground: true,
        category: 'Ambient',
        mixWithOthers: true,
      });
      playerNew.play();
      setPlayer(playerNew);
      updateState();
    }
  }, [action]);

  useEffect(() => {
    let progessInterval;
    if (player != null) {
      progessInterval = setInterval(() => {
        setCurrentTime(player.currentTime);
        setDuration(player.duration);
        updateState();
      }, 1000);
    }
    return () => {
      clearInterval(progessInterval);
    };
  });

  const onSeeking = value => {
    player.seek(value, () => {
      console.log('Seek Done!');
    });
  };

  const updateState = () => {
    setPlaying(player && player.isPlaying);
  };

  const handleControlClick = () => {
    player.playPause((err, paused) => {
      console.log(`playPause err = ${err}; paused = ${paused}`);
      updateState();
    });
  };

  const renderContent = () => (
    <UI
      item={item}
      currentTime={currentTime}
      duration={duration}
      onPlayPress={handleControlClick}
      onSeeking={onSeeking}
      playing={playing}
    />
  );

  if (item === null) {
    return null;
  }

  return (
    <BottomSheet
      ref={sheetRef}
      enabledInnerScrolling={false}
      snapPoints={[Metrics.scale(150)]}
      borderRadius={Metrics.scale(10)}
      renderContent={renderContent}
    />
  );
};

export default ButtomAudioControl;
