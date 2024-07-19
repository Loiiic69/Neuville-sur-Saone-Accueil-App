// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Importez ce que vous utilisez

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALMBb24XNorlxr4RJQouVPmmoA_78_V0Y",
  authDomain: "neuville---accueilapp.firebaseapp.com",
  databaseURL: "https://neuville---accueilapp-default-rtdb.firebaseio.com/",
  projectId: "neuville---accueilapp",
  storageBucket: "neuville---accueilapp.appspot.com",
  messagingSenderId: "634222104250",
  appId: "1:634222104250:web:40d7f47d49c4515215fc83"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);

// Obtenez une instance de la base de données
const database = getDatabase(app);

export { app, database };
