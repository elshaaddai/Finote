import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {getDatabase, ref, push} from 'firebase/database';

import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {showMessage} from 'react-native-flash-message';

const BuatKebutuhan = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [nominal, setNominal] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [batas, setBatas] = useState('');

  const handleSubmit = async () => {
    if (!nama || !nominal) {
      showMessage({
        message: 'Nama dan Nominal wajib diisi',
        type: 'danger',
      });
      return;
    }

    const newKategori = {
      title: nama,
      amount: parseInt(nominal, 10),
      description: deskripsi || '-',
      batas: parseInt(batas || '0', 10),
      createdAt: new Date().toISOString(),
    };

    try {
      const db = getDatabase();
      const kategoriRef = ref(db, 'kategori');
      await push(kategoriRef, newKategori);

      showMessage({
        message: 'Kategori berhasil dibuat',
        type: 'success',
      });

      navigation.navigate('KategoriKebutuhan');
    } catch (error) {
      console.error('Gagal menyimpan data ke Firebase:', error);
      showMessage({
        message: 'Gagal menyimpan data ke Firebase',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Buat Kategori Kebutuhan"
        withBackIcon
        onPress={() => navigation.goBack()}
      />
      <Gap height={25} />
      <TextInput
        label="Nama Kategori"
        placeholder=""
        value={nama}
        onChangeText={setNama}
      />
      <Gap height={20} />
      <TextInput
        label="Nominal"
        placeholder="Rp"
        value={nominal}
        onChangeText={text => setNominal(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <Gap height={20} />
      <TextInput
        label="Deskripsi"
        placeholder=""
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <Gap height={20} />
      <TextInput
        label="Batas Minimum Sisa"
        placeholder="Rp"
        value={batas}
        onChangeText={text => setBatas(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <Gap height={15} />
      <Button label="Buat" onPress={handleSubmit} />
    </View>
  );
};

export default BuatKebutuhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
