import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import KategoriKebutuhan from '../pages/KategoriKebutuhan';
import BuatKebutuhan from '../pages/BuatKategori';
import Pengeluaran from '../pages/Pengeluaran';

const Stack = createNativeStackNavigator();

const WalletStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="KategoriKebutuhan" component={KategoriKebutuhan} />
    <Stack.Screen name="BuatKebutuhan" component={BuatKebutuhan} />
    <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
  </Stack.Navigator>
);

export default WalletStack;
