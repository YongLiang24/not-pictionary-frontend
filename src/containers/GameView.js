import React, { Component, Fragment } from 'react';
import Canvas from '../components/Canvas';
import PlayerInteraction from './PlayerInteraction'
class GameView extends Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.isDrawing){
      return(
        <Fragment>
          <Canvas isDrawing={true}/>
          <PlayerInteraction isDrawing={true} />
        </Fragment>
      )
    }
    else{
      return(
        <Fragment>
          <Canvas isDrawing={false} />
          <PlayerInteraction isDrawing={false} />
        </Fragment>
      )
    }
  }
}
export default GameView;
