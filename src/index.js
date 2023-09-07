import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore } from 'firebase/firestore';
import { createContext } from 'react';


export const app = initializeApp({
  apiKey: "AIzaSyAQ9w6K5nzRleW8MUxe7anfOkFfdBmXoLk",
  authDomain: "chat-react-ac83a.firebaseapp.com",
  projectId: "chat-react-ac83a",
  storageBucket: "chat-react-ac83a.appspot.com",
  messagingSenderId: "750587110399",
  appId: "1:750587110399:web:519368b532380df46b3dca",
  measurementId: "G-W0XQTSJLHY"
});

export const Context = createContext(null)
const auth = getAuth(app);
const firestore = getFirestore(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    app,
    auth,
    firestore,
  }}>

  <React.StrictMode>
    <App />
  </React.StrictMode>

  </Context.Provider>
);


