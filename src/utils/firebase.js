import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const config = require('./config.js');

var firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: 'language-learning-app-300.firebaseapp.com',
  databaseURL: 'https://language-learning-app-300.firebaseio.com',
  projectId: 'language-learning-app-300',
  storageBucket: 'language-learning-app-300.appspot.com',
  messagingSenderId: '942111001476',
  appId: '1:942111001476:web:836b033f43d149ecc2abd1',
  measurementId: 'G-EEKPTZ92J7',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics(); // ?
//const auth = firebase.auth();
export const auth = firebase.auth();
//export default auth;
export const firestore = firebase.firestore();
export default firebase;
//module.exports = firebase;
