import React, { useRef, useEffect, useState, Fragment } from "react";

const Landing = () => {
  const [btn, setBtn] = useState(false);

  const refwolverine = useRef(null);
  console.log(btn);

  useEffect(() => {
    refwolverine.current.classList.add("startingImg");
    //retire l'image après du griffe 3s
    setTimeout(() => {
      refwolverine.current.classList.remove("startingImg");
      //modification du btn à true
      setBtn(true);
    }, 1000);
  }, []);

  //si btn = true, on affecte les btns dans display
  const displayBtn = btn && (
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </Fragment>
  );

  return (
    <main ref={refwolverine} className="welcomePage">
     {displayBtn}
    </main>
  );
};

export default Landing;
