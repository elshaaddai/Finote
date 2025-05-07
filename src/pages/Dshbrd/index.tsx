import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/moleculs/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Gap from '../../components/atoms/Gap';
import Card from '../../components/atoms/Card';

const DashboardPage = ({navigation, route}) => {
  const [transactions, setTransactions] = useState([]);
  const {newTransaction, existingTransactions} = route?.params || {};

  useEffect(() => {
    if (newTransaction) {
      setTransactions([newTransaction, ...(existingTransactions || [])]);
    }
  }, [newTransaction]);

  return (
    <View style={styles.container}>
      <Header
        title="Finote Dashboard"
        withBackIcon={false}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.iconButton}>
            <Icon name="cog" size={24} color="white" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 40}}>
        <Card style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Pemasukan</Text>
              <Text style={styles.value}>Rp 0</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Pengeluaran</Text>
              <Text style={styles.value}>Rp 0</Text>
            </View>
          </View>
          <Text style={styles.sisaLabel}>Sisa</Text>
          <Text style={styles.sisaValue}>Rp 0</Text>
        </Card>

        <Gap height={20} />

        <Text style={styles.sectionTitle}>🔔 Notifikasi</Text>
        <View style={styles.notificationBoxRed}>
          <Text style={styles.notificationTitle}>Hampir habis!!!!</Text>
          <Text style={styles.notificationText}>
            Uangmu dari kebutuhan Makanan tersisa Rp50.000
          </Text>
          <Text style={styles.notificationTime}>5 Jam lalu</Text>
        </View>
        <View style={styles.notificationBox}>
          <Text style={styles.notificationTitle}>Jangan lupa!!!!</Text>
          <Text style={styles.notificationText}>
            Pengeluaranmu hari ini belum dicatat, jangan lupa dicatat!
          </Text>
          <Text style={styles.notificationTime}>8 Jam lalu</Text>
        </View>
        <View style={styles.notificationBox}>
          <Text style={styles.notificationTitle}>Hampir habis!!!!</Text>
          <Text style={styles.notificationText}>
            Uangmu dari kebutuhan Rumah tersisa Rp50.000
          </Text>
          <Text style={styles.notificationTime}>1 Hari lalu</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('NotificationsPage')}>
          <Text style={styles.linkText}>Lihat Lainnya</Text>
        </TouchableOpacity>

        <Gap height={20} />

        <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
        <View style={styles.transactionBox}>
          <Text style={styles.transactionTitle}>Pengeluaran</Text>
          <Text style={styles.transactionAmount}>Rp 50.000</Text>
          <Text style={styles.transactionTime}>15 April 2025</Text>
        </View>
        <View style={styles.transactionBox}>
          <Text style={styles.transactionTitle}>Gaji Bulanan</Text>
          <Text style={styles.transactionAmount}>Rp 5.000.000</Text>
          <Text style={styles.transactionTime}>4 April 2025</Text>
        </View>
        <View style={styles.transactionBox}>
          <Text style={styles.transactionTitle}>Pengeluaran</Text>
          <Text style={styles.transactionAmount}>Rp 20.000</Text>
          <Text style={styles.transactionTime}>1 April 2025</Text>
        </View>

        {/* Tombol Lihat Lainnya */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('TransactionsPage')}>
          <Text style={styles.linkText}>Lihat Lainnya</Text>
        </TouchableOpacity>

        <Gap height={30} />
      </ScrollView>
    </View>
  );
};
export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconButton: {
    padding: 8,
  },
  balanceCard: {
    backgroundColor: '#D6E7FF',
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  balanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#061C3D',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sisaLabel: {
    fontSize: 16,
    color: '#061C3D',
    marginTop: 10,
  },
  sisaValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#061C3D',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#061C3D',
  },
  notificationBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  notificationBoxRed: {
    backgroundColor: '#FFE3E3',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  notificationText: {
    marginTop: 4,
    color: '#333',
  },
  notificationTime: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  linkText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#bbb',
    textDecorationThickness: 1,
  },
  transactionBox: {
    borderWidth: 1,
    borderColor: '#25C685',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  transactionTitle: {
    fontWeight: 'bold',
    color: '#061C3D',
  },
  transactionAmount: {
    color: '#25C685',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  transactionTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});