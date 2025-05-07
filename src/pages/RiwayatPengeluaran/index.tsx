import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Header from '../../components/moleculs/Header';
import ItemRiwayat from '../../components/moleculs/ItemRiwayat'; // import molecule baru

const dataPengeluaran = [
  {
    id: '1',
    title: 'Kebutuhan Makanan',
    price: 'Rp20.000',
    date: '20 April 2025',
  },
  {
    id: '2',
    title: 'Kebutuhan Makanan',
    price: 'Rp15.000',
    date: '25 April 2025',
  },
  {id: '3', title: 'Kebutuhan Rumah', price: 'Rp50.000', date: '3 April 2025'},
];

const RiwayatPengeluaran = () => {
  const renderItem = ({item}) => (
    <ItemRiwayat title={item.title} price={item.price} date={item.date} />
  );

  return (
    <View style={styles.container}>
      <Header title="Riwayat Pengeluaran" />
      <FlatList
        data={dataPengeluaran}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default RiwayatPengeluaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});