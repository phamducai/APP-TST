import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Pagoda, PagodaMap} from '../../containers';
import {ScreenName, getScreenTitle} from '../screen';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withTheme} from 'react-native-paper';

const Stack = createStackNavigator();

const PagodaStack = withTheme(({navigation, theme}) => {
  const {colors} = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: "#3F484F"},
        headerTitleStyle: {color: "#fff"},
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            backgroundColor="transparent"
            color="#ffffff"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        options={{
          headerTitle: getScreenTitle(ScreenName.Pagoda),
          cardStyle: {backgroundColor: colors.background}
        }}
        name={ScreenName.Pagoda}
        component={Pagoda}
      />
      <Stack.Screen
        options={{
          headerTitle: getScreenTitle(ScreenName.PagodaMap),
          cardStyle: {backgroundColor: colors.background}
        }}
        name={ScreenName.PagodaMap}
        component={PagodaMap}
      />
    </Stack.Navigator>
  );
});

export default PagodaStack;
