import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Book, BookDetail, BookCollection} from '../../containers';
import {ScreenName, getScreenTitle} from '../screen';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'react-native-paper';

const Stack = createStackNavigator();

const BookStack = withTheme(({navigation, route, theme}) => {
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
            iconSize={40}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        options={{
          headerTitle: getScreenTitle(ScreenName.BookCollection),
          cardStyle: {backgroundColor: colors.background},
        }}
        name={ScreenName.BookCollection}
        component={BookCollection}
      />
      <Stack.Screen
        options={{
          headerTitle: getScreenTitle(ScreenName.Book),
          cardStyle: {backgroundColor: colors.background},
        }}
        name={ScreenName.Book}
        component={Book}
      />
      <Stack.Screen
        options={{
          headerTitle: getScreenTitle(ScreenName.BookDetail),
        }}
        name={ScreenName.BookDetail}
        component={BookDetail}
      />
    </Stack.Navigator>
  );
});

export default BookStack;
