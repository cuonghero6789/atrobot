import { initializeApp, getApps, getApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfam37BDK7UgY9CxZsSbqiwTMWeD8DZmg",
  authDomain: "astrobot-cb8dd.firebaseapp.com",
  projectId: "astrobot-cb8dd",
  storageBucket: "astrobot-cb8dd.firebasestorage.app",
  messagingSenderId: "970774422293",
  appId: "1:970774422293:web:542acb5c1c06a1dd83bf1c"
};
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
