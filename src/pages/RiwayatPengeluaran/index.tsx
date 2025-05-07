import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDatabase, ref, onValue} from 'firebase/database';

import Header from '../../components/moleculs/Header';
import ItemRiwayat from '../../components/moleculs/ItemRiwayat';

const RiwayatPengeluaran = () => {
  const [pengeluarans, setPengeluarans] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const pengeluaranRef = ref(db, 'pengeluaran');

    const unsubscribe = onValue(pengeluaranRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        // Urutkan berdasarkan waktu terbaru (createdAt)
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPengeluarans(list);
      } else {
        setPengeluarans([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({item}) => (
    <ItemRiwayat
      title={item.keterangan || 'Tanpa Keterangan'}
      price={`Rp${item.jumlah}`}
      date={item.tanggal}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Riwayat Pengeluaran" />
      <FlatList
        data={pengeluarans}
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
