import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/moleculs/Header';
import CardKebutuhan from '../../components/moleculs/CardKebutuhan';
import Gap from '../../components/atoms/Gap';
import TextLink from '../../components/atoms/TextLink';

const KategoriKebutuhan = ({navigation}) => {
  const [kategoris, setKategoris] = useState([]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('kategori');
      if (data) {
        setKategoris(JSON.parse(data));
      } else {
        setKategoris([]);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Atur keuanganmu!" />
      <Gap height={10} />

      <View>
        {kategoris.length === 0 ? (
          <TextLink
            label="Belum ada kategori. Tambah sekarang"
            onPress={() => navigation.navigate('BuatKebutuhan')}
          />
        ) : (
          kategoris.map((item, index) => (
            <CardKebutuhan
              key={index}
              title={item.title}
              description={item.description}
              amount={item.amount}
              onPress={() => navigation.navigate('Pengeluaran')}
            />
          ))
        )}

        <TextLink
          label="Tambah"
          onPress={() => navigation.navigate('BuatKebutuhan')}
        />
      </View>
    </View>
  );
};

export default KategoriKebutuhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
