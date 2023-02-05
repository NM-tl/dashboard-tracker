import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, updateProfile, onAuthStateChanged  } from 'firebase/auth';
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzCM8QJm1U-6-3LTq725uITuo1qqJ3-1Q",
    authDomain: "dashboardtracker-3da5b.firebaseapp.com",
    projectId: "dashboardtracker-3da5b",
    storageBucket: "dashboardtracker-3da5b.appspot.com",
    messagingSenderId: "359166423803",
    appId: "1:359166423803:web:ae29f3304925f848bff65e"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage();

export const db = getFirestore(app);

export const auth = getAuth(app);

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  // const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}