import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {IconButton} from 'react-native-paper';
import { GOOGLE_API_KEY } from '../../config';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

Geolocation.setRNConfiguration({});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class PagodaMap extends React.Component {
  state = {
    location: null,
    coords: null,
    x: 'true',
    concat: null,
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="chevron-left"
          size={20}
          color="#fff"
          onPress={() => this.props.navigation.pop()}
        />
      ),
      headerTitle: (
        <Text maxNumOfLines={1} ellipsizeMode="tail">
          {this.props.route.params.name}
        </Text>
      ),
    });

    Geolocation.getCurrentPosition(
      info => {
        this.setState({location: {...info.coords}});
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }

  render() {
    const {
      location: destination,
      name,
      address,
      phone,
    } = this.props.route.params;
    console.log(this.props.route.params)
    const {location: origin} = this.state;
    return (
      <View style={styles.container}>
        {!!this.state.location && (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              ...this.state.location,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            ref={c => (this.mapView = c)}>
            <MapView.Marker coordinate={origin} title={'Bạn đang ở đây'} />
            <MapView.Marker
              coordinate={destination}
              title={name}
              description={`Địa chỉ: ${address}\nSố Điện thoại: ${phone}`}
            />
            <MapViewDirections
              origin={this.state.location}
              destination={destination}
              strokeWidth={3}
              strokeColor="#638ccd"
              apikey={GOOGLE_API_KEY}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
            />
          </MapView>
        )}
      </View>
    );
  }
}

export default PagodaMap;
