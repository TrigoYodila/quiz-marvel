import React, {Component} from 'react'

class Quiz extends Component {
  render(){

    const { pseudo } = this.props.userData
    return (
      <div>
        <h2>pseudo : {pseudo}</h2>
      </div>
    );
  }
  
}

export default Quiz
