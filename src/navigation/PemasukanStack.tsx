import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DshbrdPemasukan from '../pages/Pemasukan/DshbrdPemasukan';
import Pemasukan from '../pages/Pemasukan'; // Make sure this import matches your file structure

const Stack = createNativeStackNavigator();

const PemasukanStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DshbrdPemasukan" component={DshbrdPemasukan} />
      <Stack.Screen name="AddPemasukan" component={Pemasukan} />
    </Stack.Navigator>
  );
};

export default PemasukanStack;
