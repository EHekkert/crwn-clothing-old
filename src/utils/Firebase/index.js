import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
        createdAt
       });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};