import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel/";

class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirmer", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storeQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score:0
  };

  //Ref pour stocker le data grâce à current
  storedDataRef = React.createRef();

  //function quizz pour recupere le quizz
  //en fonction du niveau
  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      //stocke les data initiales avec reponses 
      //dans le storedDataRef
      this.storedDataRef.current = fetchedArrayQuiz;
      
      //on retire le answer dans le tableau grâce au destructuring
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({
        storeQuestions: newArray,
      });
    } else {
      console.log("Pas assez de questions !!!");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1){
      //End
    }else{
      this.setState( prevState => ({
        //recupère l'etat precedent de l'idQuestion
        idQuestion:prevState.idQuestion + 1
      }))
    }
    
    //recuperation de la vrai reponse
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion]

    if(this.state.userAnswer === goodAnswer){
      this.setState(prevState => ({
        score:prevState.score + 1
      }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storeQuestions !== prevState.storeQuestions) {
      this.setState({
        question: this.state.storeQuestions[this.state.idQuestion].question,
        options: this.state.storeQuestions[this.state.idQuestion].options,
      });
    }

    //passe à la question suivante
    //si on effectue une modification à 
    //l'id de la question
    if(this.state.idQuestion !== prevState.idQuestion){
      this.setState({
        //si l'id change, on modifie la question et les options
        question: this.state.storeQuestions[this.state.idQuestion].question,
        options: this.state.storeQuestions[this.state.idQuestion].options,

        //on vide la réponse du user
        //on desactive la question
        userAnswer:null,
        btnDisabled:true
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      //on met à jour la reponse
      //choisis par l'utilisateur
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  render() {
    // const { pseudo } = this.props.userData;

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          //test si réponse choisis = option ajoute la classe selected
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}
        </p>
      );
    });

    return (
      <div>
        {/* <h2>pseudo : {pseudo}</h2> */}
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>

        {displayOptions}

        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;
