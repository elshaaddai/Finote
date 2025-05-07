import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {getDatabase, ref, push, get, update} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';

const Pengeluaran = ({route, navigation}) => {
  const {kategoriId} = route.params;
  const [keterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');

  const handleSubmit = async () => {
    if (!kategoriId || !jumlah || !keterangan || !tanggal) {
      showMessage({
        message: 'Semua data wajib diisi',
        type: 'danger',
      });
      return;
    }

    const db = getDatabase();
    const kategoriRef = ref(db, `kategori/${kategoriId}`);

    try {
      const snapshot = await get(kategoriRef);
      if (!snapshot.exists()) {
        showMessage({
          message: 'Kategori tidak ditemukan',
          type: 'danger',
        });
        return;
      }

      const kategori = snapshot.val();
      const jumlahInt = parseInt(jumlah, 10);
      const sisa = kategori.amount - jumlahInt;

      if (sisa < 0) {
        showMessage({
          message: 'Jumlah melebihi sisa dana di kategori',
          type: 'warning',
        });
        return;
      }

      // Simpan pengeluaran
      const pengeluaranRef = ref(db, 'pengeluaran');
      await push(pengeluaranRef, {
        kategoriId,
        keterangan,
        jumlah: jumlahInt,
        tanggal,
        createdAt: new Date().toISOString(),
      });

      // Update sisa dana pada kategori
      await update(kategoriRef, {
        amount: sisa,
      });

      showMessage({
        message: 'Pengeluaran berhasil dicatat',
        type: 'success',
      });
      navigation.navigate('KategoriKebutuhan');
    } catch (error) {
      console.error('Gagal menyimpan pengeluaran:', error);
      showMessage({
        message: 'Terjadi kesalahan saat menyimpan',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Masukan Pengeluaran"
        withBackIcon
        onPress={() => navigation.goBack()}
      />
      <Gap height={25} />
      <TextInput
        label="Pengeluarannya untuk apa?"
        placeholder=""
        value={keterangan}
        onChangeText={setKeterangan}
      />
      <Gap height={20} />
      <TextInput
        label="Berapa banyak yang dikeluarkan?"
        placeholder="Rp"
        value={jumlah}
        onChangeText={text => setJumlah(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <Gap height={20} />
      <TextInput
        label="Kapan pengeluaran dilakukan?"
        placeholder="yyyy-mm-dd"
        value={tanggal}
        onChangeText={setTanggal}
      />
      <Gap height={15} />
      <Button label="Catat" onPress={handleSubmit} />
    </View>
  );
};

export default Pengeluaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
