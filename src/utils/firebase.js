import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "shekhar-dangi.firebaseapp.com",
  projectId: "shekhar-dangi",
  storageBucket: "shekhar-dangi.appspot.com",
  messagingSenderId: "841963269755",
  appId: "1:841963269755:web:7dd3ffd7898260afcbbcde",
  measurementId: "G-6XVBVP2HLM",
};

export const app = initializeApp(firebaseConfig);
