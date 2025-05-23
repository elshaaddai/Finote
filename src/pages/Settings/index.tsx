import {StyleSheet, Switch, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/moleculs/Header';
import Gap from '../../components/atoms/Gap';
import TextInput from '../../components/moleculs/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getAuth,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {getDatabase, ref, remove} from 'firebase/database';
import {Alert} from 'react-native';

const Settings = ({navigation}) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [Periode, setPeriode] = useState('Tahunan');
  const periodeList = ['Bulanan', 'Mingguan', 'Harian'];
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const toggleNotification = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleReminder = () =>
    setIsReminderEnabled(previousState => !previousState);

  const auth = getAuth();
  const db = getDatabase();

  const handlePasswordSubmit = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Password tidak boleh kosong');
      return;
    }
    Delete(); // Call the Delete function with the entered password
  };

  const Delete = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const user = auth.currentUser;

            if (user) {
              try {
                const credential = EmailAuthProvider.credential(
                  user.email,
                  password,
                );

                await reauthenticateWithCredential(user, credential);
                await remove(ref(db, 'users/' + user.uid));
                await user.delete();

                // Redirect to WelcomePage instead of SignUpPage
                navigation.reset({
                  index: 0,
                  routes: [{name: 'WelcomePage'}],
                });
              } catch (error) {
                console.log('Gagal hapus akun: ', error);
                Alert.alert(
                  'Error',
                  'Gagal hapus akun. Mungkin karena sesi sudah kadaluarsa atau kredensial salah.',
                );
              }
            }
          },
        },
      ],
    );
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginPage'}],
        });
      })
      .catch(error => {
        console.log('Logout error:', error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Settings" />
      <View style={styles.container}>
        <Gap height={10} />
        <Text style={styles.notif}>Notifikasi & Pengingat</Text>
        <Gap height={10} />
        <View style={styles.line} />
        <Gap height={24} />

        <View style={styles.row}>
          <Text style={styles.label}>Notifikasi</Text>
          <Switch
            trackColor={{false: '#767577', true: '#34C759'}}
            thumbColor={isNotificationEnabled ? '#fff' : '#f4f3f4'}
            onValueChange={toggleNotification}
            value={isNotificationEnabled}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pengingat</Text>
          <Switch
            trackColor={{false: '#767577', true: '#34C759'}}
            thumbColor={isReminderEnabled ? '#fff' : '#f4f3f4'}
            onValueChange={toggleReminder}
            value={isReminderEnabled}
          />
        </View>
        <Gap height={13} />
        <View style={styles.line} />
        <Gap height={16} />
        <Text style={styles.label}>Batas sisa dana per kategori</Text>
        <Gap height={16} />
        <View style={styles.input}>
          <TextInput
            placeholder="Masukkan Sisa Dana"
            customStyle={{marginHorizontal: 0}}
          />
        </View>
        <Gap height={22} />
        <Text style={styles.label}>Pengingat pencatatan keuangan</Text>
        <Gap height={16} />

        {/* dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={styles.dropdownText}>{Periode}</Text>
          <Icon name="chevron-down" size={14} />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {periodeList.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setPeriode(item);
                  setShowDropdown(false);
                }}>
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Gap height={20} />
        <View style={styles.line} />

        <Gap height={20} />
        <TouchableOpacity
          onPress={() => navigation.navigate('PanduanPengguna')}>
          <Text style={styles.notif}>Panduan Pengguna</Text>
        </TouchableOpacity>
        <Gap height={15} />
        <TouchableOpacity onPress={() => setShowPasswordInput(true)}>
          <Text style={styles.notif}>Hapus Akun</Text>
        </TouchableOpacity>

        {showPasswordInput && (
          <>
            <Gap height={15} />
            <TextInput
              placeholder="Masukkan Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              customStyle={{marginHorizontal: 0}}
            />
            <Gap height={15} />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowPasswordInput(false);
                  setPassword('');
                }}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handlePasswordSubmit}>
                <Text style={styles.confirmButtonText}>Konfirmasi</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <Gap height={15} />

        <TouchableOpacity onPress={Logout}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    margin: 17,
  },
  notif: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#000',
  },
  logout: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#C91111',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 25,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#000000',
  },
  input: {
    paddingRight: 152,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 152,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 152,
  },
  dropdownItem: {
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 13,
  },
  // New styles for account deletion
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#C91111',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  confirmButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
});
