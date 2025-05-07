import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardPage from '../pages/Dshbrd';
import Settings from '../pages/Settings';

const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="DashboardPage" component={DashboardPage} />
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default DashboardStack;
