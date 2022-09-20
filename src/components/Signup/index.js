import { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  //on utilise un context pour consommer
  //la classe instanciée dans le provider
  //et béneficier de ces méthodes
  const firebase = useContext(FirebaseContext);
   const navigate = useNavigate()

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  const [sign, setSign] = useState(false)

  //function handleChange
  const handleChange = (e) => {
    //on cible l'id pour savoir l'input qui a été selectionné et on le
    //met à jour (le spread operator pour récupere tout le contenu de l'objet vu qu'on ne change
    //qu'une seule valeur ciblé par son id)
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  //fonction de soumission du formulaire
  //on inscrit l'user
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    firebase
      .signupUser(email, password)
      .then((user) => {
        //operation reussi, on vide l'objet
        setLoginData({ ...data });
        //rediriger l'user une fois l'inscription fini
        navigate('/welcome')
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  //destructuration de logindata
  const { pseudo, email, password, confirmpassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmpassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  //gestion erreur
  //test s'il y'a une erreur, on affiche l'erreur
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>

        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  autocomplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autocomplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autocomplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmpassword}
                  type="password"
                  id="confirmpassword"
                  autocomplete="off"
                  required
                />
                <label htmlFor="confirmpassword">
                  Confirmer le mot de passe
                </label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
