import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gap from '../../components/atoms/Gap';
import Header from '../../components/moleculs/Header';
import {Email, Phone, Profil} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {getDatabase, ref, get, update} from 'firebase/database';
import {getAuth} from 'firebase/auth';

export default function ProfilePage({navigation}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState('');

  const auth = getAuth();
  const db = getDatabase();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (uid) {
      const userRef = ref(db, 'users/' + uid);
      get(userRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setName(data.fullName || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          if (data.photo) {
            setProfileImage(data.photo);
          }
        }
      });
    }
  }, [uid]);

  const handleEditToggle = () => {
    if (isEditing) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        Alert.alert('Error', 'Semua field harus diisi.');
        return;
      }

      // Simpan ke Firebase saat selesai edit
      const updates = {
        fullName: name,
        email: email,
        phone: phone,
        photo: profileImage || '',
      };

      update(ref(db, 'users/' + uid), updates)
        .then(() => Alert.alert('Success', 'Profil diperbarui'))
        .catch(err => Alert.alert('Error', err.message));
    }
    setIsEditing(!isEditing);
  };

  const handleChoosePhoto = () => {
    if (isEditing) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            const base64Uri = `data:${asset.type};base64,${asset.base64}`;
            setProfileImage(base64Uri);
            setProfileImageBase64(base64Uri);
          }
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Profil" withBackIcon={false} />
      <ScrollView>
        <Gap height={30} />
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image
              source={profileImage ? {uri: profileImage} : Profil}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={styles.inputName}
              value={name}
              onChangeText={setName}
              placeholder="Masukan nama"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text
              style={[styles.profileName, {color: name ? 'black' : '#aaa'}]}>
              {name ? name : 'Your Name'}
            </Text>
          )}
        </View>

        <Gap height={30} />
        <View style={styles.infoSection}>
          {/* Email */}
          <View style={styles.infoRow}>
            <Image source={Email} style={styles.icon} />
            <View>
              <Text style={styles.label}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Masukan email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={[styles.value, {color: email ? 'black' : '#aaa'}]}>
                  {email ? email : 'Your Email'}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.separator} />

          {/* Phone */}
          <View style={styles.infoRow}>
            <Image source={Phone} style={styles.icon} />
            <View>
              <Text style={styles.label}>Phone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Masukan no phone"
                  placeholderTextColor="#aaa"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={[styles.value, {color: phone ? 'black' : '#aaa'}]}>
                  {phone ? phone : 'Your Phone'}
                </Text>
              )}
            </View>
          </View>
        </View>

        <Gap height={30} />
        <View style={styles.editContainer}>
          <TouchableOpacity
            onPress={handleEditToggle}
            style={styles.editButton}>
            <Text style={styles.editText}>
              {isEditing ? 'Save' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={30} />
      </ScrollView>
    </View>
  );
}

// (styles tetap sama)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EDEDED',
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
  },
  inputName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    width: 220,
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 4,
  },
  infoSection: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaa',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 4,
    width: 250,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginVertical: 10,
  },
  editContainer: {
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#061C3D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});