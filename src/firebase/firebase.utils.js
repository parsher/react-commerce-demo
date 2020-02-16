import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCmkg1EI2Y8BlAzw2tnMpkaZTIy5CnAyMg",
  authDomain: "crwndbo.firebaseapp.com",
  databaseURL: "https://crwndbo.firebaseio.com",
  projectId: "crwndbo",
  storageBucket: "crwndbo.appspot.com",
  messagingSenderId: "1006807659595",
  appId: "1:1006807659595:web:e12647bd50a63f135a49ce"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
