import React, { Component, Fragment } from 'react';

const NewGuessForm = (props) =>{

    return(
      <div>
        <form onSubmit={props.handleForm}>
          <label>Your Guess:
            <input type='text' name='guess' />
          </label>
          <input type='submit' value='Send' />
        </form>
      </div>
    )
}
export default NewGuessForm
