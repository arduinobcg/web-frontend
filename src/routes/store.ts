import { writable, type Writable } from 'svelte/store';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import type { User } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCASMknucoZMZugZyoxp3VhZGxKq2fQwqw",
  authDomain: "arduinobcg.firebaseapp.com",
  projectId: "arduinobcg",
  storageBucket: "arduinobcg.appspot.com",
  messagingSenderId: "763646581342",
  appId: "1:763646581342:web:be105903885a6ea6f772cf"
};

// Initialize Firebase
export const firebaseApp = writable(initializeApp(firebaseConfig));
export const userResult:Writable<User|null> = writable(null);