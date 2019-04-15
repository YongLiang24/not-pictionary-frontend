import React, { Component, Fragment } from 'react';

const AnswerForm = (props) =>{
    return(
      <div>
        <form onSubmit={props.handleForm}>
          <label>Your Answer:
            <input type='text' name='answer' />
          </label>
          <input type='submit' value='Send' />
        </form>
      </div>
    )
}
export default AnswerForm
