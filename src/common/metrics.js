import {Dimensions, StyleSheet} from 'react-native';
import Helpers from './helpers';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5.5" screen mobile device
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 726;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const BaseMargin = {
  Small: scale(10),
  Medium: scale(18),
  Large: scale(20),
};

const BasePadding = {
  Small: scale(12),
};

const BorderRadius = {
  Small: scale(6),
  Medium: scale(10),
  Large: scale(20),
};

const BorderWidth = {
  Small: 1,
};

const {width: WindowWidth, height: WindowHeight} = Dimensions.get('window');

const BottomSpace = Helpers.isIphoneX() ? 20 : 0;
const TopSpace = Helpers.isIphoneX() ? 44 : verticalScale(20);

export default {
  scale,
  verticalScale,
  moderateScale,
  BaseMargin,
  BasePadding,
  BorderRadius,
  BorderWidth,
  BottomSpace,
  TopSpace,
  WindowHeight,
  WindowWidth,
};
