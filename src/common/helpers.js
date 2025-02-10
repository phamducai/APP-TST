import {Dimensions, Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

const getDeviceType = () => {
  return Platform.OS === 'ios' ? 'iOS' : 'Android';
};

const getDeviceId = () => {
  return getUniqueId();
};

const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
};

const keyMirror = obj => {
  var key;
  var mirrored = {};

  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        mirrored[key] = key;
      }
    }
  }
  return mirrored;
};

// Converts numeric degrees to radians
const toRad = value => {
  return (value * Math.PI) / 180;
};

const distanceBetweenLocations = (location1, location2) => {
  const {latitude: lat1, longitude: lng1} = location1;
  const {latitude: lat2, longitude: lng2} = location2;
  var R = 6371; // Radius of the earth in kilometers
  var dLat = toRad(lat2 - lat1); // deg2rad below
  var dLon = toRad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in KM
  return d;
};

const NumberFormat = new Intl.NumberFormat('vi-VI');

const formatCurrency = (amount = 0, unit) => {
  const formatter = unit ? new Intl.NumberFormat(unit) : NumberFormat;
  return `${formatter.format(amount) || 0}đ`;
};

const getTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export default {
  keyMirror,
  isIphoneX,
  getDeviceId,
  getDeviceType,
  distanceBetweenLocations,
  formatCurrency,
  getTimestampInSeconds,
};
