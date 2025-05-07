import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Card = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#469DBD',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});