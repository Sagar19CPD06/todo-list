// const firebaseConfig = {
//   apiKey: "AIzaSyC-3m5ODMHs8i99TBQ8IW1Ybf6WRjQ8jkw",
//   authDomain: "todo-list-e524e.firebaseapp.com",
//   projectId: "todo-list-e524e",
//   storageBucket: "todo-list-e524e.appspot.com",
//   messagingSenderId: "355921457755",
//   appId: "1:355921457755:web:f34b63d134012854e2c57e",
//   measurementId: "G-TRRL0240PE",
// };

import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC-3m5ODMHs8i99TBQ8IW1Ybf6WRjQ8jkw",
  authDomain: "todo-list-e524e.firebaseapp.com",
  projectId: "todo-list-e524e",
  storageBucket: "todo-list-e524e.appspot.com",
  messagingSenderId: "355921457755",
  appId: "1:355921457755:web:f34b63d134012854e2c57e",
  measurementId: "G-TRRL0240PE",
});

const db = firebaseApp.firestore();

export default db;
