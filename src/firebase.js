import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYUmQSQYJmpzSoKrILnZaSHfvPUyxBRgQ",
  authDomain: "clone-2-351b8.firebaseapp.com",
  projectId: "clone-2-351b8",
  storageBucket: "clone-2-351b8.appspot.com",
  messagingSenderId: "247972677489",
  appId: "1:247972677489:web:6f996d3cdd9d85871518d0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
