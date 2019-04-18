import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Redirect } from 'react-router-dom';
import Canvas from '../components/Canvas';
import PlayerInteraction from './PlayerInteraction'
import Timer from '../components/Timer'
import EndGame from '../components/EndGame'


class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOver: false,
      redirect: false,
      endCondition: ''
    }
  }

  endGame = (endCondition) => {
    console.log('end game')
    this.setState({gameOver: true, endCondition})
    // patch to game/:id to change isAvailable to false, isWon to false/true
    let endingState = {is_active: false, endCondition}

    if (endCondition === 'timeUp') {
      endingState.is_won = false
      // alert(`Game Over. You ran out of time!`)
    } else if (endCondition === 'rightAnswer') {
      endingState.is_won = true
      // alert(`You win!`)
    }

    fetch(API_ROOT+`/game/${this.props.gameId}`,{
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(endingState)
    })
      .then()
      .then()

  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/games'/>
    }
  }

  renderEndGame = () => {
    if (this.state.gameOver) {
      return <EndGame endCondition={this.state.endCondition}/>
    }
  }

  render() {
    if (this.props.isDrawing) {
      return (
        <div className='gameContainer'>
          {/* {this.renderRedirect()} */}
          {this.renderEndGame()}
          <h2>You are... Drawing</h2>
          <Timer
            gameOver={this.state.gameOver}
            endGame={this.endGame}
            gameId={this.props.gameId}
            withButton={true}
          />
          <Canvas gameId={this.props.gameId} isDrawing={true}/>
          <PlayerInteraction
            gameId={this.props.gameId}
            isDrawing={true}
            gameOver={this.state.gameOver}
            endGame={this.endGame}
          />
        </div>
      )
    }
    else {
      return (
        <div className='gameContainer'>
          {/* {this.renderRedirect()} */}
          {this.renderEndGame()}
          <h2>You are... Guessing</h2>
          <Timer
            gameOver={this.state.gameOver}
            endGame={this.endGame}
            gameId={this.props.gameId}
            withButton={false}
          />
          <Canvas gameId={this.props.gameId} isDrawing={false} />
          <PlayerInteraction
            gameId={this.props.gameId}
            isDrawing={false}
            endGame={this.endGame}
          />
        </div>
      )
    }
  }
}
export default GameView;
