import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AudioCategory, AudioSubCategory, Audio} from '../../containers';
import {ScreenName, getScreenTitle} from '../screen';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'react-native-paper';
import AudioControl from '../../containers/audio-control';

const Stack = createStackNavigator();

const AudioStack = withTheme(({navigation, route, theme}) => {
  const {colors} = theme;
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#3F484F'},
          headerTitleStyle: {color: '#fff'},
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              backgroundColor="transparent"
              color="#fff"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}>
        <Stack.Screen
          name={ScreenName.AudioCategory}
          component={AudioCategory}
          options={{
            headerTitle: getScreenTitle(ScreenName.AudioCategory),
            cardStyle: {backgroundColor: colors.background},
          }}
        />
        <Stack.Screen
          name={ScreenName.AudioSubCategory}
          component={AudioSubCategory}
          options={{
            cardStyle: {backgroundColor: colors.background},
          }}
        />
        <Stack.Screen
          name={ScreenName.Audio}
          component={Audio}
          options={{
            cardStyle: {backgroundColor: colors.background},
          }}
        />
      </Stack.Navigator>
      <AudioControl />
    </>
  );
});

export default AudioStack;
