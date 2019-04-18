import React, { Component, Fragment } from 'react';

const EndGame = (props) => {
  const rootElmt = document.getElementById('root').classList.add('body-opacity')

  if (props.endCondition === 'timeUp') {
    return (
      <div className='endGame'>
        <h3>Game Over!</h3>
        <h5>You ran out of time.</h5>
      </div>
    )
  } else if (props.endCondition === 'rightAnswer') {
    return (
      <div className='endGame'>
        <h3>You won! Great job!</h3>
        {/* <h5>You ran out of time.</h5> */}
      </div>
    )
  }
}

export default EndGame;
