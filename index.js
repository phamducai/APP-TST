/**
 * @format
 */
 import React from 'react';
 import {AppRegistry} from 'react-native';
 import App from './src/App';
 import {name as appName} from './app.json';
 import 'react-native-gesture-handler';
 import {NavigationContainer} from '@react-navigation/native';
 import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
 import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
 
 const theme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
     primary: '#fff',
     accent: '#3F484F',
     background: '#F7F4EA',
 
   },
 };
 
 function NavigationContainerWrapper() {
   return (
     <PaperProvider
       theme={theme}
       settings={{
         icon: props => <AwesomeIcon {...props} />,
       }}>
       <NavigationContainer>
         <App />
       </NavigationContainer>
     </PaperProvider>
   );
 }
 
 AppRegistry.registerComponent(appName, () => NavigationContainerWrapper);
 