import React from 'react';
import LoginStack from './LoginStack';
import BottomTabNavigator from '../components/BottomTabNavigator';
import {useAuth} from '../contexts/Auth';

const Routes = () => {
  const {signed} = useAuth();
  // return <HomeStack />;
  return signed ? <BottomTabNavigator /> : <LoginStack />;
  // console.log(signed);
  // return signed ? <HomeStack /> : <LoginStack />;
};

export default Routes;
