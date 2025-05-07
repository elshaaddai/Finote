import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../components/moleculs/Header';
import CardKebutuhan from '../../components/moleculs/CardKebutuhan';
import Gap from '../../components/atoms/Gap';
import TextLink from '../../components/atoms/TextLink';

const KategoriKebutuhan = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Atur keuanganmu!" />
      <Gap height={10} />
      <View>
        <CardKebutuhan
          title="Kebutuhan Makanan"
          description="Beli makanan jadi, beli bahan makanan mentah"
          amount="100.000"
          onPress={() => navigation.navigate('Pengeluaran')}
        />
        <CardKebutuhan
          title="Kebutuhan Ongkos Perjalanan"
          description="Indrive, ojek, bus"
          amount="100.000"
          onPress={() => navigation.navigate('Pengeluaran')}
        />
        <CardKebutuhan
          title="Kebutuhan Rumah"
          description="Listrik, air, dll"
          amount="100.000"
          onPress={() => navigation.navigate('Pengeluaran')}
        />
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
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});