import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyB1j7njcpaQIxrMAlWby0F_7oARSLoxPPA",
  authDomain: "happy-habit.firebaseapp.com",
  databaseURL: "https://happy-habit.firebaseio.com",
  projectId: "happy-habit",
  storageBucket: "happy-habit.appspot.com",
  messagingSenderId: "107082155860"
};
firebase.initializeApp(config);

export default firebase;
export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence();
export const auth = firebase.auth();
