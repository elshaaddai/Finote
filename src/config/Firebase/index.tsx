import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBICRlYZ1cGpYrjqzorZxSmKD1qEg4tqhQ',
  authDomain: 'finotedb.firebaseapp.com',
  projectId: 'finotedb',
  storageBucket: 'finotedb.firebasestorage.app',
  messagingSenderId: '1089123891727',
  appId: '1:1089123891727:web:42970dac753d0ffea7c17a',
  measurementId: 'G-W7LHVNH5E8',
  databseURL: 'https://finotedb-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});