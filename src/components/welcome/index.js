import React, { useState } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { FirebaseContext } from "../Firebase";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({})

  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    //verifie si l'utilisateur est connecté
    //si l'utilisateur est connecté on aura
    //quelque chose qui est different de null
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : navigate("/");
    });

    //si usersession est != null
    if(!!userSession){   //userSession !== null
      //recuperation des infos de l'utilisateur connecté
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            //recupère les données et met les dans
            //userData
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


    //fonction qui s'execute après le demontage
    return () => {
      listener();
    };

  }, [userSession]);

  //Si la session est null on affiche un loader
  return userSession === null ? (
    <>
      <div className="loader"></div>
      <p>Loading...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData = {userData}/>
      </div>
    </div>
  );
};

export default Welcome;
