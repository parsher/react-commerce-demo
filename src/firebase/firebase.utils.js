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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // get random generated id and doc ref
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); // success => null
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//firebase.collection('users').doc('5t39BSdtPt78nXvixnCy').collection('cartItems').doc('HwtrkBK4Uv3fNg5KwuWO');
//firebase.doc('/users/5t39BSdtPt78nXvixnCy/cartItems/HwtrkBK4Uv3fNg5KwuWO');
//firebase.collection('/users/5t39BSdtPt78nXvixnCy/cartItems');
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
