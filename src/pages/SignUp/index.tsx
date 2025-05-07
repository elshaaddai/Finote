import {Text, View, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Finote} from '../../assets';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/moleculs/TextInput';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

import {showMessage} from 'react-native-flash-message';

const SignUpPage = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          fullName: fullName,
          email: email,
        });
        showMessage({
          message: 'Registration success',
          type: 'success',
        });
        navigation.navigate('LoginPage');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={Finote} style={styles.logo} resizeMode="contain" />
        <Gap height={20} />
        <Text style={styles.title}>SignUp</Text>
        <Gap height={30} />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Gap height={20} />

          <TextInput
            placeholder="Your Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Gap height={20} />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Gap height={20} />
        </View>
        <Gap height={30} />

        <Button label="SignUp" onPress={onSubmit} />
      </View>
    </>
  );
};

export default SignUpPage;

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
    marginTop: -70,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00AEEF',
    textAlign: 'center',
    marginTop: -90,
  },
  inputWrapper: {
    width: '100%',
  },
});