import React, { Component, Fragment } from 'react';
import Canvas from './Canvas';
import NewGuessForm from './NewGuessForm';
import AnswerForm from './AnswerForm';

class GameView extends Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.isDrawing){
      return(
        <Fragment>
          <Canvas isDrawing={true}/>
          <AnswerForm />
        </Fragment>
      )
    }
    else{
      return(
        <Fragment>
          <Canvas isDrawing={false} />
          <NewGuessForm />
        </Fragment>
      )
    }
  }
}
export default GameView;
