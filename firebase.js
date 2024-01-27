import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

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
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { analytics, app, db, storage };
