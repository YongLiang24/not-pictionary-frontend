import React, { Component, Fragment } from 'react';

class Timer extends Component{

  state={
    seconds: 60,
    minutes: 5,
    interval: ''
  }

  startTimer = (e)=>{
    this.state.interval = setInterval(this.timer, 1000)
    let clickedButton = this.refs.timerButton
    clickedButton.disabled = true;
  }

  timer = ()=>{
    let tempSeconds = this.state.seconds
    if(this.state.minutes >0){
      this.setState({
        seconds: tempSeconds -1
      })
    }
    else{
      alert("Time's Up")
      clearInterval(this.state.interval)
    }

    if(this.state.seconds === 0){
      let tempMinutes = this.state.minutes
      this.setState({
        seconds: 60,
        minutes: tempMinutes -1
      })
    }

  }
  render(){
    return(
      <>
        <div id="timerBox"><strong>Timer: {this.state.minutes} : {this.state.seconds}</strong>
          {" "}
          <button id='timerButton' ref='timerButton' onClick={this.startTimer}><strong>Start</strong></button>
        </div>

      </>
    )
  }
}

export default Timer;
