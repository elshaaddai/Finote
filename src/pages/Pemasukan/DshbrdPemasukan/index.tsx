import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/moleculs/Header';
import LastTransaksi from '../LastTransaksi';
import Button from '../../../components/atoms/Button';
import Card from '../../../components/atoms/Card';
import Gap from '../../../components/atoms/Gap';

const DshbrdPemasukan = ({navigation, route}) => {
  const {jumlah, periode} = route.params || {};

  const [transactions, setTransactions] = useState([]);

  const {newTransaction, existingTransactions} = route.params || {};

  useEffect(() => {
    if (newTransaction) {
      setTransactions([newTransaction, ...(existingTransactions || [])]);
    }
  }, [newTransaction]);

  const onSubmit = () => {
    navigation.navigate('Pemasukan', {
      screen: 'AddPemasukan',
      params: {transactions},
    });
  };
  return (
    <View style={styles.container}>
      <Header title={'Catatan Pemasukan'} />

      <Card style={styles.card}>
        <Text style={styles.Title}>
          Pemasukan{' '}
          {transactions.length > 0 ? transactions[0].periode : 'Periode'}
        </Text>
        <Text style={styles.mount}>
          {transactions.length > 0
            ? `Rp ${Number(transactions[0].jumlah).toLocaleString('id-ID')}`
            : 'Rp 0'}
        </Text>
      </Card>

      <LastTransaksi transactions={transactions} />
      <Gap height={20} />

      <Button label="Tambah Pemasukan" onPress={onSubmit} />
    </View>
  );
};

export default DshbrdPemasukan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    width: 380,
    height: 191,
    marginTop: 87,
    margin: 16,
  },
  Title: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#00000',
    marginTop: 32,
    textAlign: 'center',
  },
  mount: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 54,
    textAlign: 'center',
  },
});