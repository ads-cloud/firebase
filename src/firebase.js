import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDQrhtkoagsVKEV288FTzK3kTEziJHii7Q",
    authDomain: "react-proyectos-104ad.firebaseapp.com",
    projectId: "react-proyectos-104ad",
    storageBucket: "react-proyectos-104ad.appspot.com",
    messagingSenderId: "976897957503",
    appId: "1:976897957503:web:f09a7b29ad588251a0a94a"
  };

  firebase.initializeApp(firebaseConfig)

  export {firebase}