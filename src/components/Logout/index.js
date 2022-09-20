import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (checked) {
        //on test si le bouton deconnexion est cliqué
      firebase.signoutUser()
      console.log("Déconnexion");
    }
  }, [checked,firebase]);

  const handleChange = e => {
    setChecked(e.target.checked);
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input 
        onChange={handleChange}
        type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
