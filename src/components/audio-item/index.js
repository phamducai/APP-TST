import React, {useState} from 'react';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {Metrics} from '../../common';
import {withTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Progress from 'react-native-progress';
import {SAVE_AUDIO} from '../../store/actions/actionTypes';
import RNFetchBlob from 'rn-fetch-blob';
import {CMS_RESOURCE_BASE_URL} from '../../config';

const LineItem = withTheme(
  ({
    theme: {colors},
    id,
    data,
    onItemPress,
    selectedItem,
    showMore = true,
    onMorePress,
    downloaded = false,
    categoryId,
  }) => {
    const {name} = data;
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();

    const cardStyle = {
      backgroundColor: selectedItem ? '#d3d3d3' : colors.background,
    };

    const onDownloadFile = () => {
      RNFetchBlob.config({
        path:
          RNFetchBlob.fs.dirs.DocumentDir +
          '/tosuthien/' +
          data.audio[0] +
          '.mp3',
      })
        .fetch('GET', `${CMS_RESOURCE_BASE_URL}${data.audio[0]}`)
        .progress((receveied, total) => {
          setProgress(receveied / total);
        })
        .then(res => {
          dispatch({
            type: SAVE_AUDIO,
            item: {...data, audioId: data.audio[0], categoryId},
          });
        });
    };

    const renderRight = () => {
      if (showMore) {
        return <Icon size={Metrics.scale(24)} name="chevron-right" />;
      }
      if (downloaded) {
        return <Icon size={Metrics.scale(24)} name="play-circle" />;
      }

      if (progress) {
        return <Progress.Circle progress={progress} size={20} />;
      }

      return (
        <TouchableOpacity onPress={onDownloadFile}>
          <Icon size={Metrics.scale(24)} name="download-cloud" />
        </TouchableOpacity>
      );
    };

    return (
      <Card style={cardStyle} onPress={() => onItemPress({id, ...data})}>
        <Card.Title
          title={name}
          right={renderRight}
          style={STYLE}
          titleStyle={TITLE}
        />
      </Card>
    );
  },
);

export default LineItem;

const STYLE = {
  paddingRight: 16,
};

const TITLE = {
  marginRight: 16,
};
