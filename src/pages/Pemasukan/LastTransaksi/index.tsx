import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Gap from '../../../components/atoms/Gap';

const LastTransaksi = ({transactions}) => {
  return (
    <View>
      <Text style={styles.transaction}>Transaksi Terakhir</Text>

      <View style={styles.scroll}>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.title}>{item.sumber}</Text>
                <Text style={styles.date}>{item.tanggal}</Text>
              </View>
              <Text style={styles.amount}>
                Rp {item.jumlah.toLocaleString('id-ID')}
              </Text>
            </View>
          )}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />

        <Gap height={22} />
      </View>
    </View>
  );
};

export default LastTransaksi;

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 200,
    marginBottom: 10,
  },
  transaction: {
    color: '#000000',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 39,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: '#061C3D',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  date: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#156B03',
  },
});