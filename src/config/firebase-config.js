import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_apiKey,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    databaseURL: process.env.EXPO_PUBLIC_databaseURL,
    projectId: process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: process.env.EXPO_PUBLIC_appId,
    measurementId: process.env.EXPO_PUBLIC_measurementId
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence:  getReactNativePersistence(AsyncStorage)})
export const db = getFirestore();