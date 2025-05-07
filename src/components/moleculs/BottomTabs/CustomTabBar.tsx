import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        // Atur icon berdasarkan nama route
        const getIcon = () => {
          switch (route.name) {
            case 'Dashboard':
              return 'home-outline';
            case 'Wallet':
              return 'wallet-outline';
            case 'Add':
              return 'add';
            case 'History':
              return 'time-outline';
            case 'Profile':
              return 'person-outline';
            default:
              return 'ellipse-outline';
          }
        };

        const iconName = getIcon();
        const iconColor = isFocused ? '#00BFFF' : '#ccc';
        const isCenter = route.name === 'Add';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isCenter && styles.centerButton]}
            activeOpacity={0.7}>
            <Ionicons
              name={iconName}
              size={isCenter ? 36 : 24}
              color={isCenter ? '#FFF' : iconColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#061C3D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    backgroundColor: '#00003C',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: -35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;