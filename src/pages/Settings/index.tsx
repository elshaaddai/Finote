import {StyleSheet, Switch, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/moleculs/Header';
import Gap from '../../components/atoms/Gap';
import TextInput from '../../components/moleculs/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [Periode, setPeriode] = useState('Tahunan');
  const periodeList = ['Bulanan', 'Mingguan', 'Harian'];

  const toggleNotification = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleReminder = () =>
    setIsReminderEnabled(previousState => !previousState);

  return (
    <View>
      <Header title="Settings" />
      <View style={styles.container}>
        <Gap height={32} />
        <Text style={styles.notif}>Notifikasi & Pengingat</Text>
        <Gap height={28} />
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
            thumbColor={isNotificationEnabled ? '#fff' : '#f4f3f4'}
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

        <Gap height={39} />
        <View style={styles.line} />

        <Gap height={45} />
        <Text style={styles.notif}>Panduan Pengguna</Text>
        <Gap height={15} />
        <Text style={styles.notif}>Hapus Akun</Text>
        <Gap height={15} />
        <Text style={styles.logout}>Log Out</Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
    // paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 13,
  },
});