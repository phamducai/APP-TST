import React from 'react';
import {Title, Paragraph} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../config/color';
import {Metrics} from '../../common';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: Metrics.scale(16),
    paddingTop: Metrics.scale(64),
  },
});

const Empty = ({title, description, icon = 'transporter-empty', iconSize = Metrics.scale(64), style}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <Icon name={icon} size={iconSize} color={Colors.lightGrey} />
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </View>
  );
};

export default Empty;
