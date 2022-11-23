const firebaseConfig = {
    apiKey: "AIzaSyDXvFv2OgN_2Z05cUrZe_iN8dNFEPKGpc8",
    authDomain: "campus-connections-cd94f.firebaseapp.com",
    projectId: "campus-connections-cd94f",
    storageBucket: "campus-connections-cd94f.appspot.com",
    messagingSenderId: "1059368902891",
    appId: "1:1059368902891:web:fc578d5f2ba6a0005b9eae"
  };
  
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var storage = firebase.storage();