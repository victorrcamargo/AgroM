import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// import BottomTabNavigator from './components/BottomTabNavigator';
import {AuthProvider} from './contexts/Auth';
import Routes from './stack/index';

// import Login from './pages/Login/index';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        {/* <BottomTabNavigator /> */}
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
