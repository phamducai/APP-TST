import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, StatusBar, View} from 'react-native';
import {Metrics} from '../../common';
import {withTheme} from 'react-native-paper';
import {ScreenName} from '../../navigation/screen';
import {Container} from './style';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {fetchVideoCategoriesAction} from '../../store/actions';
import {fetchPagodasAction} from '../../store/actions';

const mapStateToProps = state => {
  return {
    fetching: state.videoCategoryReducers.fetching,
    data: state.videoCategoryReducers.videoCategories,
    error: state.videoCategoryReducers.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => dispatch(fetchVideoCategoriesAction(params)),
    fetchPagodas: params => dispatch(fetchPagodasAction(params)),
  };
};

const SplashScreen = withTheme(({theme: {colors}, navigation, fetchData, fetchPagodas}) => {
  
  useEffect(() => {
    fetchData({itemPerPage: 20, page: 0});
    fetchPagodas();
    setTimeout(() => {
      navigation.dispatch(StackActions.replace(ScreenName.Main));
    }, 2000);
  }, []);

  return (
    <Container background={colors.background}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.textStyle}>Tổ sư thiền</Text>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Metrics.scale(64),
    padding: Metrics.scale(64),
  },
  buttonContainer: {
    padding: Metrics.scale(8),
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Metrics.scale(64),
    fontWeight: '600',
  },
});


const SplashScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);

export default SplashScreenContainer;
