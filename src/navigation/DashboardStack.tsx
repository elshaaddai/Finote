import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Pemasukan from '../pages/Pemasukan';
import DashboardPage from '../pages/Dshbrd';

const Stack = createNativeStackNavigator();

const PemasukanStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DashboardPage" component={DashboardPage} />
      <Stack.Screen name="AddPemasukan" component={Pemasukan} />
    </Stack.Navigator>
  );
};

export default PemasukanStack;
