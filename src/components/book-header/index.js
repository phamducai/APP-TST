import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Metrics} from '../../common';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightBlock: {
    flexDirection: 'row',
  },
  upDown: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default ({
  bookmarking,
  onDone,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onToggleBookmark,
  onChangePage,
  style,
  ...otherProps
}) => {
  const {top} = useSafeAreaInsets();
  const handleToggleBookmark = () => {
    onToggleBookmark?.();
  };

  const handleIncreaseFontSize = () => {
    onIncreaseFontSize?.();
  };

  const handleDecreaseFontSize = () => {
    onDecreaseFontSize?.();
  };

  const handleChangePage = () => {
    onChangePage?.();
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...style,
        paddingTop: Metrics.scale(8) + top,
      }}
      {...otherProps}
      edges={['left', 'right']}>
      <View style={styles.rightBlock}>
        <Button title="Done" onPress={onDone} />
        <TouchableOpacity onPress={handleChangePage}>
          <IconButton icon="th" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.rightBlock}>
        <TouchableOpacity onPress={handleDecreaseFontSize}>
          <IconButton icon="font" size={20} color="#000" />
          <IconButton
            style={styles.upDown}
            icon="minus"
            size={8}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIncreaseFontSize}>
          <IconButton icon="font" size={20} color="#000" />
          <IconButton icon="plus" style={styles.upDown} size={8} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleBookmark}>
          <IconButton
            icon="bookmark"
            size={20}
            color={bookmarking ? '#45b6fe' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
