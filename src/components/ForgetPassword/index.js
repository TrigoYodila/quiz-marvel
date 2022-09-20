import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const firebase = useContext(FirebaseContext);
  const [success, setSuccess] = useState(null);
  const [eror, setEror] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //methode pour envoyer le lien à l'email
    //de l'utilisateur
    firebase
      .passwordReset(email)
      .then(() => {
        setEror(null);
        setSuccess(
          `Consultez votre email ${email} pour changer le mot de passe`
        );
        setEmail("");

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        setEror(error);
        setEmail("");
      });
  };

  const disable = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>

        <div className="formBoxRight">
          <div className="formContent">
            {
            success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
                {success}
              </span>
            )}

            {
                eror && <span>{eror.message}</span>
            }

            <h2>Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autocomplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <button disabled={disable}>Recuperer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
