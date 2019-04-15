import React, { Component, Fragment } from 'react';
import NewGuessForm from '../components/NewGuessForm';
import AnswerForm from '../components/AnswerForm';

const PlayerInteraction = (props) =>{
  const handleForm = (ev) =>{
    ev.preventDefault()
    ev.persist()
    console.log(ev.target.guess.value)
  }
    if(props.isDrawing){
      return(
        <Fragment>
          <AnswerForm handleForm={handleForm}/>
        </Fragment>
      )
    }
    else{
      return(
        <Fragment>
          <NewGuessForm  handleForm={handleForm}/>
        </Fragment>
      )
    }
}
export default PlayerInteraction;
