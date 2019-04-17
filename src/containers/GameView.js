import React, { Component, Fragment } from 'react';
import Canvas from '../components/Canvas';
import PlayerInteraction from './PlayerInteraction'
import Timer from '../components/Timer';
class GameView extends Component {
  constructor(props){
    super(props)
  }

  render(){
    if (this.props.isDrawing) {
      return (
        <Fragment>
          <Canvas gameId={this.props.gameId} isDrawing={true}/>
          <PlayerInteraction gameId={this.props.gameId} isDrawing={true} />
          <Timer />
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <Canvas gameId={this.props.gameId} isDrawing={false} />
          <PlayerInteraction gameId={this.props.gameId} isDrawing={false} />
          <Timer />
        </Fragment>
      )
    }
  }
}
export default GameView;
