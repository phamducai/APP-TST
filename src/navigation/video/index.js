import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {VideoCategory, VideoDetail, Videos} from '../../containers';
import {ScreenName, getScreenTitle} from '../screen';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'react-native-paper'

const Stack = createStackNavigator();

const VideoStack = withTheme(({navigation, route, theme}) => {
  const {colors} = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#3F484F'},
        headerTitleStyle: {color: '#fff'},
        headerTitle: getScreenTitle(route.name),
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
        name={ScreenName.VideoCategory}
        component={VideoCategory}
        options={{
          headerTitle: getScreenTitle(ScreenName.VideoCategory),
          cardStyle: {backgroundColor: colors.background},
        }}
      />
      <Stack.Screen
        name={ScreenName.Videos}
        component={Videos}
        options={{
          cardStyle: {backgroundColor: colors.background},
        }}
      />
      <Stack.Screen
        name={ScreenName.VideoDetail}
        component={VideoDetail}
        options={{cardStyle: {backgroundColor: colors.background}}}
      />
    </Stack.Navigator>
  );
});

export default VideoStack;
