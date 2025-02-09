"use client";
// src/firebase.ts
// TODO: Create a Firebase project and add the configuration here

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// initialize firebase app
const fireBaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// initialize Firebase Authentication
export const fireBaseAuth = getAuth(fireBaseApp);
