import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
  import { BackButton } from '../../../assets';

const Header = ({onPress, title, withBackIcon, rightComponent}) => {
  return (
    <View style={styles.contentContainer}>
      {withBackIcon ? (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
          <BackButton />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} /> 
      )}
      <Text style={styles.title}>{title}</Text>

      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#061C3D',
    paddingVertical: 20,
    paddingHorizontal: 17,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingTop: 15,
    flex: 1,
  },
  backButton: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rightComponent: {
    paddingLeft: 10,
  },
});