import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAoh29NQPMFN3nm8gK4kpUY_xrOXlVe5NA",
  authDomain: "imessage-clone-cp-e904f.firebaseapp.com",
  projectId: "imessage-clone-cp-e904f",
  storageBucket: "imessage-clone-cp-e904f.appspot.com",
  messagingSenderId: "415385548413",
  appId: "1:415385548413:web:eeefe69ba8a4933cdf6314",
  measurementId: "G-YQ5RY6B8RS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
