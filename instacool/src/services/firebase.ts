import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAvphDwIIFznH95aEhr32X1Z73g3a2fat4",
  authDomain: "instacool-10258.firebaseapp.com",
  databaseURL: "https://instacool-10258.firebaseio.com",
  projectId: "instacool-10258",
  storageBucket: "instacool-10258.appspot.com",
  messagingSenderId: "796390332878",
  appId: "1:796390332878:web:badf295683295e5733739f",
  measurementId: "G-K373Z3DK4V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
