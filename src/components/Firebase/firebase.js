import app from "firebase/compat/app";
//importation du package d'authentification
import "firebase/compat/auth";
//importation du package de BD (cloud firestore)
import "firebase/compat/firestore";

//objet de configuration firebase
const config = {
  apiKey: "AIzaSyBFRfTMA5JKwkUNixVWR9G9kaRKbTRKVzA",
  authDomain: "marvel-quiz-54043.firebaseapp.com",
  projectId: "marvel-quiz-54043",
  storageBucket: "marvel-quiz-54043.appspot.com",
  messagingSenderId: "531663895980",
  appId: "1:531663895980:web:f90ec6309da42523660e09",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    //définition de l'objet pour accéder aux fonctionnalités firebase
    //liées à l'authentification
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //Méthodes

  //inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  //connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //deconnexion
  signoutUser = () => this.auth.signOut();

  //Récupérer le mot de passe
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  //methode pour enregistrer le user dans la bd
  //on crée un document
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
