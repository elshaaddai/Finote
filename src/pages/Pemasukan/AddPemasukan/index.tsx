import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput as RNTextInput,
  Platform,
  Keyboard,
} from 'react-native';
import Header from '../../../components/moleculs/Header';
import TextInput from '../../../components/moleculs/TextInput';
import Gap from '../../../components/atoms/Gap';
import Button from '../../../components/atoms/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getDatabase, ref, push, serverTimestamp} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

const formatDate = date => {
  const d = new Date(date);
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const AddPemasukan = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [manualDate, setManualDate] = useState('');
  const [periode, setPeriode] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [jumlah, setJumlah] = useState('');
  const [sumber, setSumber] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const existingTransactions = route.params?.transactions || [];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setManualDate(formatDate(currentDate));
  };

  const handleManualInput = text => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4,
      )}/${cleaned.slice(4)}`;
    }

    setManualDate(formatted);

    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('/');
      const parsed = new Date(`${year}-${month}-${day}`);
      if (!isNaN(parsed)) {
        setDate(parsed);
      }
    }
  };

  const showCalender = () => {
    Keyboard.dismiss();
    setTimeout(() => setShow(true), 100);
  };

  const periodeList = ['Harian', 'Bulanan', 'Tahunan'];

  const onSimpan = () => {
    if (!jumlah || !sumber || !periode) {
      showMessage({
        message: 'Jumlah, sumber, dan periode tidak boleh kosong',
        type: 'danger',
      });
      return;
    }

    try {
      const data = {
        jumlah: parseInt(jumlah, 10),
        tanggal: manualDate,
        periode,
        sumber,
        keterangan,
        type: 'pemasukan',
        existingTransactions,
      };

      const db = getDatabase();
      const transactionRef = ref(db, 'transactions');
      push(transactionRef, data)
        .then(() => {
          console.log('Data berhasil disimpan');
          showMessage({
            message: 'Data pemasukan berhasil disimpan',
            type: 'success',
          });

          navigation.navigate('Detail', {
            jumlah,
            tanggal: manualDate,
            periode,
            sumber,
            keterangan,
            existingTransactions: [...existingTransactions, data],
          });
        })
        .catch(error => {
          console.error('Gagal menyimpan data:', error);
          showMessage({
            message: 'Gagal menyimpan data: ' + error.message,
            type: 'danger',
          });
        });
    } catch (error) {
      console.error('Gagal memproses data:', error);
      showMessage({
        message: 'Gagal memproses data: ' + error.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Tambah Pemasukan'}
        withBackIcon
        onPress={() => navigation.goBack()}
      />
      <Gap height={56} />
      <View>
        <TextInput
          label="Jumlah"
          placeholder="Rp"
          value={jumlah}
          onChangeText={text => {
            const cleaned = text.replace(/[^0-9]/g, '');
            setJumlah(cleaned);
          }}
          keyboardType="numeric"
        />
        <Gap height={8} />
        <TextInput
          label="Sumber"
          placeholder="Gaji, Bonus, dll"
          value={sumber}
          onChangeText={text => setSumber(text)}
        />
        <Gap height={8} />

        {/* Tanggal */}
        <Text style={styles.label}>Tanggal</Text>
        <View style={styles.dateInput}>
          <RNTextInput
            style={styles.dateText}
            value={manualDate}
            onChangeText={handleManualInput}
            placeholder="DD/MM/YYYY"
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity onPress={showCalender}>
            <Icon name="calendar" size={21} color="#000" />
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        )}

        {/* Periode */}
        <Gap height={8} />
        <Text style={styles.label}>Periode</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={{color: periode ? '#00000' : '#aaa'}}>
            {periode || 'Pilih Periode'}
          </Text>
          <Icon name="chevron-down" size={14} />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {periodeList.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.dropdownItem,
                  periode === item && styles.activeItem,
                ]}
                onPress={() => {
                  setPeriode(item);
                  setShowDropdown(false);
                }}>
                <Text
                  style={[
                    styles.dropdownText,
                    periode === item && styles.activeText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Keterangan */}
        <Gap height={8} />
        <Text style={styles.label}>Keterangan</Text>
        <Gap height={8} />
        <View>
          <RNTextInput
            style={styles.textArea}
            placeholder="Pesan"
            multiline
            value={keterangan}
            onChangeText={text => setKeterangan(text)}
          />
        </View>
        <Gap height={168} />

        <Button label="Simpan" onPress={onSimpan} />
      </View>
    </View>
  );
};

export default AddPemasukan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#000',
    marginHorizontal: 17,
  },
  dateInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 17,
  },
  dateText: {
    fontSize: 17,
    flex: 1,
    color: '#000',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 17,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal: 17,
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
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
  activeText: {
    fontWeight: 'bold',
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    marginHorizontal: 17,
  },
});
