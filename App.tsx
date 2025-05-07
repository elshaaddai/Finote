import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from './src/pages/SplashScreen';
import WelcomePage from './src/pages/Tampilan';
import SignUpPage from './src/pages/SignUp';
import LoginPage from './src/pages/SignIn';
import Settings from './src/pages/Settings';
import DashboardPage from './src/pages/Dshbrd';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BuatKebutuhan from './src/pages/BuatKategori';
import BottomTabs from './src/components/moleculs/BottomTabs';
import Pengeluaran from './src/pages/Pengeluaran';
import KategoriKebutuhan from './src/pages/KategoriKebutuhan';
import Pemasukan from './src/pages/Pemasukan';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DashboardPage"
            component={DashboardPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pemasukan"
            component={Pemasukan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuatKebutuhan"
            component={BuatKebutuhan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pengeluaran"
            component={Pengeluaran}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="KategoriKebutuhan"
            component={KategoriKebutuhan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" floating={true} duration={2000} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
