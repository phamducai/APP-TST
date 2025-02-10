import React, {useLayoutEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenName, getScreenTitle} from '../screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import PagodaStack from '../pagoda';
import BookStack from '../book';
import AudioStack from '../audio';
import VideoStack from '../video';
import {Metrics} from '../../common';
import {StatusBar} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import {withTheme} from 'react-native-paper';

const CustomDrawerContent = withTheme(props => {
  return (
    <DrawerContentScrollView
      headerStatusBarHeight={0}
      hideStatusBar={false}
      {...props}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.8]}
        colors={['#fff', '#fff']}
        style={{width: '100%', height: Metrics.scale(32)}}
      />
      <DrawerItemList
        activeTintColor={'#000'}
        inactiveTintColor={'#000'}
        activeBackgroundColor={'#d8d8d8'}
        {...props}
      />
    </DrawerContentScrollView>
  );
});

const Drawer = createDrawerNavigator();

const iconSize = Metrics.scale(24);

const Main = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon.Button
          name="ios-menu"
          backgroundColor="transparent"
          color="black"
          iconSize={iconSize}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  }, [navigation, route]);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Drawer.Navigator
        drawerContent={props => {
          return <CustomDrawerContent {...props} />;
        }}
        initialRouteName={ScreenName.Book}>
        <Drawer.Screen
          name={ScreenName.BookStack}
          component={BookStack}
          options={{
            drawerLabel: getScreenTitle(ScreenName.Book),
            drawerIcon: ({color}) => {
              return <Icon size={iconSize} name="ios-book" color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name={ScreenName.AudioStack}
          component={AudioStack}
          options={{
            drawerLabel: getScreenTitle(ScreenName.AudioCategory),
            drawerIcon: ({color}) => (
              <Icon size={iconSize} name="ios-play" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={ScreenName.VideoStack}
          component={VideoStack}
          options={{
            drawerLabel: getScreenTitle(ScreenName.VideoCategory),
            drawerIcon: ({color}) => (
              <Icon size={iconSize} name="logo-youtube" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={ScreenName.PagodaStack}
          component={PagodaStack}
          options={{
            drawerLabel: getScreenTitle(ScreenName.Pagoda),
            drawerIcon: ({color}) => (
              <Icon size={iconSize} name="md-locate" color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default Main;
