import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import Canvas from '../components/Canvas';
import PlayerInteraction from './PlayerInteraction'
import Timer from '../components/Timer'
import { ActionCableConsumer } from 'react-actioncable-provider';


class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOver: false
    }
  }

  endGame = (endCondition) => {
    console.log('end game')
    this.setState({gameOver: true})
    // patch to game/:id to change isAvailable to false
    if (endCondition === 'timeUp') {
      alert(`Game Over. You ran out of time!`)
    } else if (endCondition === 'rightAnswer') {
      alert(`You win!`)
    }

    // fetch(API_ROOT+`/game/${this.props.gameId}`,{
    //   method: 'PATCH',
    //   headers: HEADERS,
    //   body: JSON.stringify({endCondition})
    // })
    //   .then(response => response.json())
    //   .then(console.log)

  }

  render() {
    if (this.props.isDrawing) {
      return (
        <Fragment>
          <h2>You are... Drawing</h2>
          <Timer
            gameOver={this.state.gameOver}
            endGame={this.endGame}
          />
          <Canvas gameId={this.props.gameId} isDrawing={true}/>
          <PlayerInteraction
            gameId={this.props.gameId}
            isDrawing={true}
            gameOver={this.state.gameOver}
            endGame={this.endGame}
          />
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <h2>You are... Guessing</h2>
          <Timer
            gameOver={this.state.gameOver}
            endGame={this.endGame}
          />
          <Canvas gameId={this.props.gameId} isDrawing={false} />
          <PlayerInteraction
            gameId={this.props.gameId}
            isDrawing={false}
          />
        </Fragment>
      )
    }
  }
}
export default GameView;
