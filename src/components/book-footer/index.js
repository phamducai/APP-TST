import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Metrics} from '../../common';

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightBlock: {
    flexDirection: 'row',
  },
  item: {
    padding: Metrics.scale(8),
    height: Metrics.scale(64),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Metrics.scale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    fontSize: Metrics.scale(18),
  },
  pagesInfo: {
    width: '100%',
    position: 'absolute',
    top: Metrics.scale(-48),
    alignItems: 'center',
  },
  pagesInfoText: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Metrics.scale(4),
    padding: Metrics.scale(8),
    backgroundColor: '#000',
    color: '#fff',
    fontSize: Metrics.scale(20),
    fontWeight: '700',
    borderRadius: Metrics.scale(4),
  },
});

export default ({
  onPageSelected,
  selectedIndex,
  pages,
  onDone,
  style,
  isLoading,
  ...otherProps
}) => {
  const carousel = useRef(null);

  const pageNumbers = Array.from({length: pages}).map((_, idx) => ({
    title: `${idx + 1}`,
  }));

  const handleTouchItem = useCallback(
    index => () => {
      if (carousel) {
        carousel.current.snapToItem(index);
        onPageSelected && onPageSelected(index);
      }
    },
    [onPageSelected],
  );

  const renderItem = useCallback(
    ({item, index}, parallaxProps) => {
      return (
        <TouchableOpacity style={styles.item} onPress={handleTouchItem(index)}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleTouchItem],
  );

  useEffect(() => {
    carousel.current.snapToItem(selectedIndex - 1);
  }, [selectedIndex]);

  return (
    <View style={{...style}} {...otherProps}>
      <View style={styles.pagesInfo}>
        <Text
          style={styles.pagesInfoText}>{`${selectedIndex} of ${pages}`}</Text>
      </View>
      <Carousel
        ref={carousel}
        style={{...style}}
        data={pageNumbers}
        initialNumToRender={2}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        sliderHeight={Metrics.scale(64)}
        itemWidth={Metrics.scale(64)}
        activeSlideAlignment="start"
      />
    </View>
  );
};
