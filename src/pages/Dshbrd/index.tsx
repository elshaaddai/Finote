import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../components/moleculs/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Gap from '../../components/atoms/Gap';
import Card from '../../components/atoms/Card';
import {getDatabase, ref, get} from 'firebase/database';

const DashboardPage = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const db = getDatabase();

        // STEP 1: Fetch PENGELUARAN data
        let pengeluaranTotal = 0;
        const pengeluaranData = [];

        try {
          console.log('Fetching pengeluaran data...');
          const pengeluaranRef = ref(db, 'pengeluaran');
          const pengeluaranSnap = await get(pengeluaranRef);

          if (pengeluaranSnap.exists()) {
            pengeluaranSnap.forEach(child => {
              const data = child.val();
              // Convert to number and handle null/undefined
              const amount = data.jumlah ? Number(data.jumlah) : 0;

              // Validate amount
              if (!isNaN(amount)) {
                pengeluaranTotal += amount;
                pengeluaranData.push({
                  ...data,
                  id: child.key,
                  type: 'pengeluaran',
                  jumlah: amount,
                });
              } else {
                console.warn('Invalid amount found in pengeluaran:', data);
              }
            });

            console.log(`Found ${pengeluaranData.length} pengeluaran items.`);
            console.log('Total Pengeluaran:', pengeluaranTotal);
          } else {
            console.log('Pengeluaran collection exists but is empty');
          }
        } catch (error) {
          console.error('Failed to fetch pengeluaran:', error);
        }

        // STEP 2: Try to fetch PEMASUKAN data from multiple potential locations
        let pemasukanTotal = 0;
        const pemasukanData = [];

        // First try 'pemasukan' collection
        try {
          console.log("Fetching pemasukan data from 'pemasukan' collection...");
          const pemasukanRef = ref(db, 'pemasukan');
          const pemasukanSnap = await get(pemasukanRef);

          if (pemasukanSnap.exists()) {
            pemasukanSnap.forEach(child => {
              const data = child.val();
              const amount = data.jumlah ? Number(data.jumlah) : 0;

              if (!isNaN(amount)) {
                pemasukanTotal += amount;
                pemasukanData.push({
                  ...data,
                  id: child.key,
                  type: 'pemasukan',
                  jumlah: amount,
                });
              }
            });

            console.log(
              `Found ${pemasukanData.length} pemasukan items from direct collection.`,
            );
          } else {
            console.log(
              "No direct 'pemasukan' collection found, trying 'transactions'...",
            );

            // If not found, try 'transactions' collection
            const transactionsRef = ref(db, 'transactions');
            const transactionsSnap = await get(transactionsRef);

            if (transactionsSnap.exists()) {
              transactionsSnap.forEach(child => {
                const data = child.val();

                if (data.type === 'pemasukan') {
                  const amount = data.jumlah ? Number(data.jumlah) : 0;

                  if (!isNaN(amount)) {
                    pemasukanTotal += amount;
                    pemasukanData.push({
                      ...data,
                      id: child.key,
                      jumlah: amount,
                    });
                  }
                }
              });

              console.log(
                `Found ${pemasukanData.length} pemasukan items in transactions collection.`,
              );
            } else {
              console.log('No transactions collection found either.');
            }
          }

          console.log('Total Pemasukan:', pemasukanTotal);
        } catch (error) {
          console.error('Failed to fetch pemasukan:', error);
        }

        // STEP 3: Update state with calculated totals
        setTotalPengeluaran(pengeluaranTotal);
        setTotalPemasukan(pemasukanTotal);

        console.log(
          'FINAL TOTALS - Pemasukan:',
          pemasukanTotal,
          'Pengeluaran:',
          pengeluaranTotal,
        );

        // STEP 4: Combine transactions for display
        const allTransactions = [...pemasukanData, ...pengeluaranData];

        // Sort transactions by date if available
        const sortedTransactions = allTransactions.sort((a, b) => {
          // Try different date fields
          const aDate = a.createdAt || a.tanggal || a.date;
          const bDate = b.createdAt || b.tanggal || b.date;

          if (aDate && bDate) {
            return new Date(bDate) - new Date(aDate);
          }
          return 0;
        });

        setTransactions(sortedTransactions.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.error('Fatal error in fetchData:', error);
        Alert.alert('Error', `Gagal mengambil data: ${error.message}`, [
          {text: 'OK'},
        ]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <Text style={styles.value}>
                Rp {totalPemasukan.toLocaleString('id-ID')}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Pengeluaran</Text>
              <Text style={styles.value}>
                Rp {totalPengeluaran.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
          <Text style={styles.sisaLabel}>Sisa</Text>
          <Text style={styles.sisaValue}>
            Rp {(totalPemasukan - totalPengeluaran).toLocaleString('id-ID')}
          </Text>
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('NotificationsPage')}>
          <Text style={styles.linkText}>Lihat Lainnya</Text>
        </TouchableOpacity>

        <Gap height={20} />

        <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading transaksi...</Text>
        ) : transactions.length > 0 ? (
          transactions.map((item, index) => (
            <View key={index} style={styles.transactionBox}>
              <Text style={styles.transactionTitle}>
                {item.type === 'pemasukan'
                  ? item.sumber || 'Pemasukan'
                  : item.keterangan || 'Pengeluaran'}
              </Text>
              <Text style={styles.transactionAmount}>
                Rp {(item.jumlah || 0).toLocaleString('id-ID')}
              </Text>
              <Text style={styles.transactionTime}>
                {item.tanggal || 'Tanggal tidak tersedia'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>Belum ada transaksi</Text>
        )}
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
    marginTop: 20,
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
  noTransactionsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
