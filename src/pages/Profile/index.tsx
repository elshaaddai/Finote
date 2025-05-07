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
  import React, {useState} from 'react';
  import Gap from '../../components/atoms/Gap';
  import Header from '../../components/moleculs/Header';
  import {Email, Phone, Profil} from '../../assets';
  import {launchImageLibrary} from 'react-native-image-picker';
  
  export default function ProfilePage({navigation}) {
    const [isEditing, setIsEditing] = useState(false); // Default: view mode
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState(null);
  
    const handleEditToggle = () => {
      if (isEditing) {
        if (!name.trim() || !email.trim() || !phone.trim()) {
          Alert.alert('Error', 'Semua field harus diisi.');
          return;
        }
      }
      setIsEditing(!isEditing);
    };
  
    const handleChoosePhoto = () => {
      if (isEditing) {
        launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            setProfileImage(response.assets[0].uri);
          }
        });
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