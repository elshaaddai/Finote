import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Row = ({label, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  label: {
    width: 110,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    marginRight: 10,
  },
  colon: {
    width: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  value: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
  },
});