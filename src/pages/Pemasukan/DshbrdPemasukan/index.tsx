import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/moleculs/Header';
import LastTransaksi from '../LastTransaksi';
import Button from '../../../components/atoms/Button';
import Card from '../../../components/atoms/Card';
import Gap from '../../../components/atoms/Gap';
import {getDatabase, ref, onValue} from 'firebase/database';

const DshbrdPemasukan = ({navigation, route}) => {
  const [transactions, setTransactions] = useState([]);


  const params = route.params || {};
  const newTransaction = params.newTransaction;
  const existingTransactions = params.existingTransactions || [];

  useEffect(() => {
    if (newTransaction) {
      setTransactions(currentTransactions => {
        const exists = currentTransactions.some(
          t =>
            t.jumlah === newTransaction.jumlah &&
            t.tanggal === newTransaction.tanggal &&
            t.sumber === newTransaction.sumber,
        );

        if (exists) {
          return currentTransactions;
        }

        return [newTransaction, ...currentTransactions];
      });
    } else if (existingTransactions.length > 0) {
      setTransactions(existingTransactions);
    } else {
      const db = getDatabase();
      const transactionsRef = ref(db, 'transactions');

      onValue(
        transactionsRef,
        snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const transactionList = Object.keys(data).map(key => ({
              id: key,
              ...data[key],
            }))
            .reverse();

            const incomeTransactions = transactionList.filter(
              t => t.type === 'pemasukan',
            );

            setTransactions(incomeTransactions);
          }
        },
        {
          onlyOnce: true,
        },
      );
    }
  }, [newTransaction, existingTransactions]);

  const formatCurrency = amount => {
    return amount
      ? `Rp ${parseInt(amount, 10).toLocaleString('id-ID')}`
      : 'Rp 0';
  };

  const latestPeriode =
    transactions.length > 0 ? transactions[0].periode : 'Periode';
  const latestJumlah = transactions.length > 0 ? transactions[0].jumlah : 0;

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
    marginTop: 50,
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
