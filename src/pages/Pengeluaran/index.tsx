import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../components/moleculs/Header';
import TextInput from '../../components/moleculs/TextInput';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';

const Pengeluaran = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Masukan Pengeluaran" />
      <Gap height={25} />
      <TextInput label="Pengeluarannya untuk apa?" placeholder="" />
      <Gap height={20} />
      <TextInput label="Berapa banyak yang dikeluarkan?" placeholder="Rp" />
      <Gap height={20} />
      <TextInput label="Kapan pengeluaran dilakukan?" placeholder="" />
      <Gap height={15} />
      <Button
        label="Catat"
        onPress={() => navigation.navigate('KategoriKebutuhan')}
      />
    </View>
  );
};

export default Pengeluaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
