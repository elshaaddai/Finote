import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Header from '../../components/moleculs/Header';
import Gap from '../../components/atoms/Gap';

const PanduanPengguna = () => {
  return (
    <View style={styles.container}>
      <Header title="Panduan Pengguna" />
      <Gap height={20} />
      <ScrollView style={styles.sectionContainer}>
        {/* 1. Kategori Kebutuhan */}
        <View style={styles.section}>
          <Text style={styles.heading}>1. Kategori Kebutuhan</Text>
          <Text style={styles.text}>
            Buat dan atur kategori kebutuhan seperti "Makan", "Transportasi",
            "Hiburan", dan lainnya. Ini membantu mengelompokkan pengeluaran
            agar pengelolaan keuangan lebih terstruktur.
          </Text>
        </View>

        {/* 2. Catatan Pemasukan */}
        <View style={styles.section}>
          <Text style={styles.heading}>2. Catatan Pemasukan</Text>
          <Text style={styles.text}>
            Tambahkan catatan pemasukan setiap kali Anda menerima uang, seperti
            gaji, bonus, atau penghasilan lainnya. Ini penting untuk
            mencatat arus kas masuk Anda.
          </Text>
        </View>

        {/* 3. Profil */}
        <View style={styles.section}>
          <Text style={styles.heading}>3. Profil</Text>
          <Text style={styles.text}>
            Lihat informasi akun Anda, termasuk nama, email, dan foto profil.
            Fitur ini membantu memverifikasi identitas dan personalisasi akun.
          </Text>
        </View>

        {/* 4. Notifikasi & Pengingat */}
        <View style={styles.section}>
          <Text style={styles.heading}>4. Notifikasi & Pengingat</Text>
          <Text style={styles.text}>
            Aktifkan notifikasi dan pengingat agar Anda tidak melewatkan
            pengeluaran atau catatan penting.
          </Text>
        </View>

        {/* 5. Batas Sisa Dana */}
        <View style={styles.section}>
          <Text style={styles.heading}>5. Batas Sisa Dana</Text>
          <Text style={styles.text}>
            Anda bisa menetapkan batas dana untuk setiap kategori agar
            pengeluaran lebih terkontrol.
          </Text>
        </View>

        {/* 6. Pengingat Pencatatan Keuangan */}
        <View style={styles.section}>
          <Text style={styles.heading}>6. Pengingat Pencatatan Keuangan</Text>
          <Text style={styles.text}>
            Pilih frekuensi pengingat (harian, mingguan, bulanan, tahunan) untuk
            mencatat transaksi keuangan Anda.
          </Text>
        </View>

        {/* 7. Hapus Akun */}
        <View style={styles.section}>
          <Text style={styles.heading}>7. Hapus Akun</Text>
          <Text style={styles.text}>
            Fitur ini akan menghapus semua data yang terkait dengan akun Anda.
            Gunakan dengan hati-hati.
          </Text>
        </View>

        {/* 8. Log Out */}
        <View style={styles.section}>
          <Text style={styles.heading}>8. Log Out</Text>
          <Text style={styles.text}>
            Gunakan tombol "Log Out" untuk keluar dari aplikasi dengan aman.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#001F3F',
    marginBottom: 4,
  },
  text: {
    fontSize: 18,
    color: '#333',
    lineHeight: 22,
  },
});

export default PanduanPengguna;
