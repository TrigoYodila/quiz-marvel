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

  const setLeftImg = () => {
    refwolverine.current.classList.add("leftImg");
  };

  const setRightImg = () => {
    refwolverine.current.classList.add("rightImg");
  };

  
  const clearImg = () => {
    //vérifie si la classe rightImg existe puis supprime la
    if(refwolverine.current.classList.contains("rightImg")){
        refwolverine.current.classList.remove("rightImg");
    }else if(refwolverine.current.classList.contains("leftImg")){
        refwolverine.current.classList.remove("leftImg")
    }
  }

  //si btn = true, on affecte les btns dans display
  const displayBtn = btn && (
    <Fragment>
      <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
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
