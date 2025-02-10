import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../../containers';
import Main from '../main';
import {ScreenName} from '../screen';

const Stack = createStackNavigator();

const SplashScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenName.SplashScreen}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.Main}
        component={Main}
        options={{headerShown: false,
          cardStyle: {backgroundColor: '#000'}
        }}
      />
    </Stack.Navigator>
  );
};

export default SplashScreenStack;
