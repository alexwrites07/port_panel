// firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase, ref as databaseRef, set, remove, push, get, ref } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMkQRCI7WSHHpKNdK91DC0DLcFw56Ohlg",
  authDomain: "facultyport.firebaseapp.com",
  databaseURL: "https://facultyport-default-rtdb.firebaseio.com",
  projectId: "facultyport",
  storageBucket: "facultyport.appspot.com",
  messagingSenderId: "296505134325",
  appId: "1:296505134325:web:3e506795892779742249bc"
};
  

const app = initializeApp(firebaseConfig);

const database = {
  get: async (path) => get(databaseRef(getDatabase(app), path)),
  set: async (path, data) => set(ref(getDatabase(app), path), data),
  push: async (path, data) => push(ref(getDatabase(app), path), data),
  remove: async (path) => remove(ref(getDatabase(app), path)),
};

const storageFunctions = {
  ref: (path) => storageRef(getStorage(app), path),
  uploadBytes: async (ref, data) => uploadBytes(ref, data),
  getDownloadURL: async (ref) => getDownloadURL(ref),
};

export { app, database, storageFunctions,getDatabase, ref };


