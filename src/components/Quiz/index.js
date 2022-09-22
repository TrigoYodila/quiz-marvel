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
  };

  //function quizz pour recupere le quizz
  //en fonction du niveau
  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storeQuestions !== prevState.storeQuestions) {
      this.setState({
        question: this.state.storeQuestions[this.state.idQuestion].question,
        options: this.state.storeQuestions[this.state.idQuestion].options,
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
          className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
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

        <button disabled={this.state.btnDisabled} className="btnSubmit">
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;
