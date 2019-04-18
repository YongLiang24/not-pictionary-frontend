import React, { Component, Fragment } from 'react';
import NewGuessForm from '../components/NewGuessForm';
import AnswerForm from '../components/AnswerForm';
import GuessList from '../components/GuessList';
import { API_ROOT, HEADERS } from '../constants';
import Timer from '../components/Timer';

class PlayerInteraction extends Component{

  constructor(){
    super()
    this.state={
      answerInput: '',
      hideAnswerForm: false,
      answerString: "Your Answer: "
    }
  }

  handleGameForms = (ev) => {
    ev.preventDefault()
    if(ev.target.name === "answer"){
      console.log("answerForm check", ev.target.answer.value)
      //triggers the timer channel
      const timer = {
        currentGameId: this.props.gameId
      }
      fetch(API_ROOT + '/timer', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(timer)
      })
      //timer channel ends
      this.setState({
        answerInput: ev.target.answer.value,
        hideAnswerForm: true
      })
    }
    else{
      const formType = ev.target.name
      const formValue = ev.target[formType].value
      const playerId = JSON.parse(localStorage.getItem('playerData')).playerId
      const type = 'form'

      fetch(API_ROOT+`/game/${this.props.gameId}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({[formType]: formValue, playerId, type})
      })
    }
  }



render(){
  if (this.props.isDrawing) {
    return (
      <Fragment>
        {
          this.state.hideAnswerForm ?
            <div>{this.state.answerString} <strong>{this.state.answerInput}</strong></div> :
            <AnswerForm handleForm={this.handleGameForms}/>
        }

        <GuessList
          gameId={this.props.gameId}
          isDrawing={this.props.isDrawing}
          gameOver={this.props.gameOver}
          endGame={this.props.endGame}
        />
      </Fragment>
    )
  }
  else {
    return (
      <Fragment>
        <NewGuessForm handleForm={this.handleGameForms}/>
        <GuessList
          gameId={this.props.gameId}
          isDrawing={this.props.isDrawing}
          gameOver={this.props.gameOver}
          endGame={this.props.endGame}
        />
      </Fragment>
    )
  }
}

}

export default PlayerInteraction;
