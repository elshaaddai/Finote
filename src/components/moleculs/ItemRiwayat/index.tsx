import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemRiwayat = ({title, price, date}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.separator} />
    </View>
  );
};

export default ItemRiwayat;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAE4F2',
    marginTop: 8,
  },
});