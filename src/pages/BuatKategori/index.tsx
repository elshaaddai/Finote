import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';

const BuatKebutuhan = ({onPress, navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Buat Kategori Kebutuhan" />
      <Gap height={25} />
      <TextInput label="Nama Kategori" placeholder="" />
      <Gap height={20} />
      <TextInput label="Nominal" placeholder="Rp" />
      <Gap height={20} />
      <TextInput label="Deskripsi" placeholder="" />
      <Gap height={20} />
      <TextInput label="Batas Minimum Sisa" placeholder="Rp" />
      <Gap height={15} />
      <Button
        label="Buat"
        onPress={() => navigation.navigate('KategoriKebutuhan')}
      />
    </View>
  );
};

export default BuatKebutuhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});