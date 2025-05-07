import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Finote} from '../../assets';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/moleculs/TextInput';
import {Google} from '../../assets';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
      navigation.navigate('DashboardPage', {uid: user.uid});
    })
    .catch(error => {
      const errorMessage = error.message;
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Finote} style={styles.logo} resizeMode="contain" />
      <Gap height={20} />
      <Text style={styles.title}>Login</Text>
      <Gap height={70} />

      <TouchableOpacity onPress={() => console.log('Google Button Pressed')}>
        <Image source={Google} style={styles.googleIcon} />
      </TouchableOpacity>
      <Gap height={20} />
      <View style={styles.inputWrapper}>
        <TextInput placeholder="Your Email" keyboardType="email-address" value={email} onChangeText={value=>setEmail(value)} />
        <Gap height={20} />

        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={value => setPassword(value)} />
      </View>
      <Gap height={30} />

      <Button
        label="Login"
        onPress={onSubmit}
        height={55}
      />
    </View>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  logo: {
    height: 394,
    width: 394,
    marginTop: -170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00AEEF',
    textAlign: 'center',
    marginTop: -130,
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  inputWrapper: {
    width: '100%',
  },
});