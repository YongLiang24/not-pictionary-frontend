import React, { Component, Fragment } from 'react';

const EndGame = (props) => {
  if (props.endCondition === 'timeUp') {
    return (
      <Fragment>
        <h3>Game Over!</h3>
        <h5>You ran out of time.</h5>
      </Fragment>
    )
  } else if (props.endCondition === 'rightAnswer') {
    return (
      <Fragment>
        <h3>You won! Great job!</h3>
        {/* <h5>You ran out of time.</h5> */}
      </Fragment>
    )
  }
}

export default EndGame;
