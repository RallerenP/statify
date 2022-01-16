import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCm9eAqP-KiLDHmVF0srV38KHWPCKNrdsg",
  authDomain: "statify-d687a.firebaseapp.com",
  projectId: "statify-d687a",
  storageBucket: "statify-d687a.appspot.com",
  messagingSenderId: "896405898422",
  appId: "1:896405898422:web:8bc1842ef8b151efe81217",
  measurementId: "G-2QXKB5RXDF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }


