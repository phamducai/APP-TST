/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SplashScreenStack from './navigation/splash-screen';
import OneSignal from 'react-native-onesignal';
import {Provider} from 'react-redux';

import {ONE_SIGNAL_API_KEY} from './config';

import {LogBox} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import configStore from './store/configStore';
import {PersistGate} from 'redux-persist/integration/react';

const AppContainer = () => {
  useEffect(() => {
    OneSignal.init(ONE_SIGNAL_API_KEY);
  }, []);
  return <SplashScreenStack />;
};

const App = () => {
  const {store, persistor} = configStore();

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'Require cycle: node_module',
    ]);
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
