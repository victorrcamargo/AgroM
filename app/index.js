import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

export const Index = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
