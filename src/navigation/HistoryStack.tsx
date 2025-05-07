import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RiwayatPengeluaran from '../pages/RiwayatPengeluaran';

const Stack = createNativeStackNavigator();

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="RiwayatPengeluaran" component={RiwayatPengeluaran} />
  </Stack.Navigator>
);

export default HistoryStack;
