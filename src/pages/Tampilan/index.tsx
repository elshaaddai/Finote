import {Text, View, Image, StyleSheet} from 'react-native';
import {Finote} from '../../assets';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import React from 'react';

const WelcomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={Finote} style={styles.logo} resizeMode="contain" />
      <Gap height={10} />
      <Text style={styles.title}>SELAMAT DATANG</Text>
      <Gap height={40} />
      <Text style={styles.description}>
        Aplikasi ini memiliki fitur untuk mencatat pemasukan, membagi dana ke
        dalam kategori, dan memantau pengeluaran secara detail. Dengan sistem
        pembagian yang fleksibel dan pengingat sisa dana, Anda bisa mengatur
        uang dengan lebih bijak dan capai target keuangan Anda.
      </Text>
      <Gap height={80} />

      <Button
        label="Login"
        onPress={() => navigation.navigate('LoginPage')}
        height={55}
      />
      <Gap height={20} />
      <Button
        label="Register"
        onPress={() => navigation.navigate('SignUpPage')}
        height={55}
        backgroundColor="#2196F3"
      />
    </View>
  );
};
export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    height: 394,
    width: 394,
    marginTop: -120,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00AEEF',
    textAlign: 'center',
    marginTop: -90,
  },
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});