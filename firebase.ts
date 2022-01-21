// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseApp = initializeApp({
	apiKey: "AIzaSyAxMVaD9QWngRqggNmfG0mB0276GpG59kY",
	authDomain: "todolist-c3a69.firebaseapp.com",
	databaseURL: "https://todolist-c3a69-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "todolist-c3a69",
	storageBucket: "todolist-c3a69.appspot.com",
	messagingSenderId: "699547713159",
	appId: "1:699547713159:web:79ec868d63822e871a4222",
});

const firestore: Firestore = getFirestore(firebaseConfig);
const auth: Auth = getAuth(firebaseConfig);

export { firebaseConfig as firebase, firestore, auth };
