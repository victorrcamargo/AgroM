import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';

import HomeStack from '../stack/HomeStack';
import AddPubStack from '../stack/AddPubStack';
import Profile from '../stack/ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={HomeStack}
      tabBarOptions={{
        activeTintColor: '#2aa62a',
        inactiveTintColor: '#a8afb9',
        tabStyle: {
          justifyContent: 'center',
          height: 50,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Início"
        component={HomeStack}
        options={{
          title: '',
          tabBarIcon: () => <Icon name="home" size={27} color="#2aa62a" />,
        }}
      />
      <Tab.Screen
        name="Publicar"
        component={AddPubStack}
        options={{
          title: '',
          tabBarIcon: () => <Icon name="plus" size={55} color="#2aa62a" />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          title: '',
          tabBarIcon: () => <Icons name="person" size={27} color="#2aa62a" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
