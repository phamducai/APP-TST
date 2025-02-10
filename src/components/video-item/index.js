import React from 'react';
import {Card, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {Metrics} from '../../common';

const VideoItem = withTheme(
  ({theme: {colors}, id, title, videoId, onItemPress, onMorePress}) => {
    return (
      <Card
        style={{flex: 0.5, backgroundColor: colors.background}}
        onPress={() => onItemPress({id, title, videoId})}>
        <Card.Title
          title={title}
          right={() => <Icon size={Metrics.scale(24)} name="chevron-right" />}
        />
      </Card>
    );
  },
);

export default VideoItem;
