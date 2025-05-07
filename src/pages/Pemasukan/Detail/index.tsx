import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../../components/moleculs/Header';
import Gap from '../../../components/atoms/Gap';
import Card from '../../../components/atoms/Card';
import Row from './Row';

const Detail = ({navigation, route}) => {
  const {periode, sumber, jumlah, keterangan, tanggal} = route.params;

  const formatCurrency = value => {
    return 'Rp ' + parseInt(value, 10).toLocaleString('id-ID');
  };

  return (
    <View style={styles.container}>
      <Header title="Detail Pemasukan" />
      <Gap height={50} />
      <Card style={styles.card}>
        <Text style={styles.mount}>{formatCurrency(jumlah)}</Text>
        <Text style={styles.total}>Total Pemasukan</Text>
        <View style={styles.line} />

        <Gap height={30} />
        <Row label="Tanggal" value={tanggal} />
        <Gap height={27} />
        <Row label="Periode" value={periode} />
        <Gap height={27} />
        <Row label="Sumber" value={sumber} />
        <Gap height={27} />
        <Row label="Keterangan" value={keterangan || '-'} />
      </Card>

      <Gap height={54} />
      <TouchableOpacity
        onPress={() => navigation.navigate('DshbrdPemasukan')}
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
    height: 500,
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
    backgroundColor: '#ffffff66',
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
    marginRight: 15,
  },
});
