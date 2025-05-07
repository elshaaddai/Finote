import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';

// Import Stack Navigators
import DashboardStack from '../../../navigation/DashboardStack';
import WalletStack from '../../../navigation/WalletStack';
import HistoryStack from '../../../navigation/HistoryStack';
import ProfileStack from '../../../navigation/ProfilStack';

// Halaman yang langsung digunakan
import DshbrdPemasukan from '../../../pages/Pemasukan/DshbrdPemasukan';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Wallet" component={WalletStack} />
      <Tab.Screen name="Add" component={DshbrdPemasukan} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
