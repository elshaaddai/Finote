import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfilePage from '../pages/Profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
  </Stack.Navigator>
);

export default ProfileStack;
