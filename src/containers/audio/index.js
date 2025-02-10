/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {AudioItem, Empty} from '../../components';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  fetchSubAudioCategorieByIdAction,
  playAction,
} from '../../store/actions';
import {IconButton, Text} from 'react-native-paper';

// import TrackPlayer from 'react-native-track-player';

const mapStateToProps = state => {
  return {
    fetching: state.subAudioCategoryReducers.currentAudioCollectionFetching,
    data: state.subAudioCategoryReducers.currentAudioCollection,
    error: state.subAudioCategoryReducers.currentAudioCollectionError,
    player: state.playerReducers.player,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => dispatch(fetchSubAudioCategorieByIdAction(id)),
    playAction: link => dispatch(playAction(link)),
  };
};

const Audio = ({
  route: {params},
  fetchData,
  navigation,
  playAction,
  player,
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
          {params.name}
        </Text>
      ),
    });
  }, [navigation, params]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const action = useSelector(state =>
    state.playerReducers.player ? state.playerReducers.player.action : null,
  );
  const saveAudios = useSelector(state => state.audioStorageReducers.audios);

  useEffect(() => {
    fetchData(params.id);
  }, []);

  useEffect(() => {
    if (player) {
      setSelectedItem(player.item);
    }
  }, [player]);

  const localAudios = saveAudios.filter(
    s => params && s.categoryId === params.id,
  );

  let audios =
    params != null && params.audios && params.audios.length
      ? params.audios
      : localAudios;

  const renderItem = ({item, index}) => {
    const audioLocal = saveAudios.find(s => s.audioId === item.audio[0]);

    return (
      <AudioItem
        data={{...item, name: item.title}}
        selectedItem={selectedItem && item.audio[0] === selectedItem.audio[0]}
        onItemPress={async item => {
          if (action && action === 'PLAY') {
            playAction({action: 'REPLAY', item: audioLocal || item});
          } else {
            playAction({action: 'PLAY', item: audioLocal || item});
          }

          setShowBottomSheet(true);
        }}
        categoryId={params.id}
        onMorePress={item => console.log(item)}
        showMore={false}
        downloaded={!!audioLocal}
      />
    );
  };

  return (
    <FlatList
      data={audios}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={renderItem}
      contentInset={{bottom: 160}}
      ListEmptyComponent={
        audios.length !== 0 ? null : (
          <Empty
            title="Không tìm thấy bài viết nào"
            description="Vui lòng thử lại sau"
            icon={'folder-open'}
          />
        )
      }
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

const AudioContainer = connect(mapStateToProps, mapDispatchToProps)(Audio);

export default AudioContainer;
