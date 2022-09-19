import app from "firebase/app";
//importation du package d'authentification
import "firebase/auth";

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
    this.auth = app.auth();
  }

  //Méthodes

  //inscription
  sighupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);
  
 
  //connexion
  loginUser = (email,password) => 
    this.auth.signInWithEmailAndPassword(email,password)
  
    //deconnexion
    signoutUser = () => this.auth.signOut();
}

export default Firebase;
