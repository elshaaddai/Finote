import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import DshbrdPemasukan from './DshbrdPemasukan';
import AddPemasukan from './AddPemasukan';
import Detail from './Detail';
import LastTransaksi from './LastTransaksi';

const Stack = createNativeStackNavigator();

const Pemasukan = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="DshbrdPemasukan"
        component={DshbrdPemasukan}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="AddPemasukan"
        component={AddPemasukan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LastTransaksi"
        component={LastTransaksi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Pemasukan;

const styles = StyleSheet.create({});
