import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBZZ5eQwrJLikPl9ZeejsZWjyJM2IHjqBM",
  authDomain: "engage-now-c8a2e.firebaseapp.com",
  projectId: "engage-now-c8a2e",
  storageBucket: "engage-now-c8a2e.appspot.com",
  messagingSenderId: "298516182323",
  appId: "1:298516182323:web:42209752c196fdfc98fa46",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
