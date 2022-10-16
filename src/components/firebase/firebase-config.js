import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDylgtTkS27ygWh_J2k124gM7PC-eAN3No",
  authDomain: "realesata.firebaseapp.com",
  databaseURL: "https://realesata-default-rtdb.firebaseio.com",
  projectId: "realesata",
  storageBucket: "realesata.appspot.com",
  messagingSenderId: "471117089021",
  appId: "1:471117089021:web:a0c804dca5c50ff1601694",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export {db , auth}