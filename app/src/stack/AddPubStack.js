import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AddPub from '../pages/AddPub';

const Stack = createStackNavigator();

const AddPubStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddPub"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Publicar" component={AddPub} />
    </Stack.Navigator>
  );
};

export default AddPubStack;
