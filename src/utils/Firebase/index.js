import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1IxN41iZymarJnHdhNaGRWdjtH3zL8rQ",
  authDomain: "crwn-clothing-db-6ea23.firebaseapp.com",
  projectId: "crwn-clothing-db-6ea23",
  storageBucket: "crwn-clothing-db-6ea23.appspot.com",
  messagingSenderId: "754314570355",
  appId: "1:754314570355:web:7baf40ba3a80f7de031806"
};

// Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: 'consent',
  login_hint: 'user@tauw.com',
  tenant: 'a9274667-2493-46b3-beaa-d7b77e1cb63a'
});

export const auth = getAuth();
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInWithMicrosoftRedirect = () => signInWithRedirect(auth, microsoftProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists())
  {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, { 
        displayName,
        email,
        createdAt,
        ...additionalInformation
       });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}