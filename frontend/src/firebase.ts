// src/firebase.ts
// TODO: Create a Firebase project and add the configuration here

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "key",
  authDomain: "domain",
  projectId: "id",
  storageBucket: "bucket",
  messagingSenderId: "id",
  appId: "id",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize Firebase Authentication
export const auth = getAuth(app);
