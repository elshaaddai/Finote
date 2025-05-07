import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../../components/moleculs/Header';
import Gap from '../../../components/atoms/Gap';
import Card from '../../../components/atoms/Card';
import Row from './Row';

const Detail = ({navigation, route}) => {
  const params = route?.params ?? {};
  const {
    jumlah = '0',
    tanggal = 'N/A',
    periode = 'N/A',
    sumber = 'N/A',
    keterangan = 'Tidak ada',
    existingTransactions = [],
  } = params;

  const noData = !route?.params;

  return (
    <View style={styles.container}>
      <Header title="Detail Pemasukan" />
      <Gap height={60} />

      {noData ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          Tidak ada data pemasukan untuk ditampilkan.
        </Text>
      ) : (
        <Card style={styles.card}>
          <Text style={styles.mount}>Rp {jumlah}</Text>
          <Text style={styles.total}>Total Pemasukan</Text>
          <View style={styles.line} />

          <Gap height={44} />
          <Row label="Tanggal" value={tanggal} />
          <Gap height={27} />
          <Row label="Periode" value={periode} />
          <Gap height={27} />
          <Row label="Sumber" value={sumber} />
          <Gap height={27} />
          <Row label="Keterangan" value={keterangan} />
        </Card>
      )}

      <Gap height={54} />
      <TouchableOpacity
        onPress={() => {
          const newTransaction = {
            jumlah,
            periode,
            sumber,
            tanggal,
            keterangan,
          };
          navigation.navigate('Pemasukan', {
            screen: 'DshbrdPemasukan',
            newTransaction,
            existingTransactions,
          });
        }}
        activeOpacity={0.5}>
        <Text style={styles.back}>Kembali ke Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 380,
    height: 538,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  mount: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 24,
    marginHorizontal: 61,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
    marginLeft: 96,
    color: '#1C1B1F',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 12,
    marginTop: 36,
    marginHorizontal: 15,
  },
  back: {
    fontFamily: 'Poppins-Italic',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
    marginRight: 5,
  },
});