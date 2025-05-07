import {StyleSheet} from 'react-native';
import React from 'react';
import SplashScreen from './src/pages/SplashScreen';
import WelcomePage from './src/pages/Tampilan';
import SignUpPage from './src/pages/SignUp';
import LoginPage from './src/pages/SignIn';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './src/components/moleculs/BottomTabs';
import FlashMessage from 'react-native-flash-message';
import Pemasukan from './src/pages/Pemasukan';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          {/* <Stack.Screen name="SignUpPage" component={SignUpPage} /> */}
          <Stack.Screen name="LoginPage" component={LoginPage} />
          {/* Hapus Pemasukan dari root navigator karena sekarang ada di dalam PemasukanStack */}
          {/* <Stack.Screen name="Pemasukan" component={Pemasukan} /> */}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="AddPemasukan" component={AddPemasukan} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" floating={true} duration={2000} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
