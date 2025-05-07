import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDatabase, ref, onValue, remove} from 'firebase/database';

import Header from '../../components/moleculs/Header';
import CardKebutuhan from '../../components/moleculs/CardKebutuhan';
import Gap from '../../components/atoms/Gap';
import TextLink from '../../components/atoms/TextLink';
import {showMessage} from 'react-native-flash-message';

const KategoriKebutuhan = ({navigation}) => {
  const [kategoris, setKategoris] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const kategoriRef = ref(db, 'kategori');

    const unsubscribe = onValue(kategoriRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setKategoris(list);
      } else {
        setKategoris([]);
      }
    });

    return () => unsubscribe(); // Unsubscribe saat komponen unmount
  }, []);

  const handleDelete = async id => {
    try {
      const db = getDatabase();
      await remove(ref(db, `kategori/${id}`));
      showMessage({
        message: 'Kategori berhasil dihapus',
        type: 'success',
      });
    } catch (error) {
      console.error('Gagal menghapus kategori:', error);
      showMessage({
        message: 'Gagal menghapus kategori',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Atur keuanganmu!" />
      <Gap height={10} />

      <View>
        {kategoris.map((item, index) => (
          <CardKebutuhan
            key={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
            onPress={() =>
              navigation.navigate('Pengeluaran', {kategoriId: item.id})
            }
            onDelete={() => handleDelete(item.id)}
          />
        ))}

        <TextLink
          label="Tambah"
          onPress={() => navigation.navigate('BuatKebutuhan')}
        />
      </View>
    </View>
  );
};

export default KategoriKebutuhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
