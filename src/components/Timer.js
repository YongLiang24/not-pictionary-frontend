import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider';

class Timer extends Component{
  state={
    seconds: 59,
    minutes: 2,
    interval: ''
  }

  startTimer = (e)=>{
    this.state.interval = setInterval(this.timer, 1000)
    let clickedButton = this.refs.timerButton
    clickedButton.disabled = true;
    const timer = {
      currentGameId: this.props.gameId
    }
    fetch(API_ROOT + '/timer', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(timer)
    })
  }


  timer = ()=>{
    let tempSeconds = this.state.seconds
    if(this.state.minutes >-1){
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
        seconds: 59,
        minutes: tempMinutes -1

      })
    }
  }

  handleReceivedTimer = (resp) =>{
    console.log("timer", resp)
    this.state.interval = setInterval(this.timer, 1000)

  }
  render(){
    if(this.props.withButton){
      return(
        <>
          <div id="timerBox">Timer: {this.state.minutes} : {this.state.seconds}
            {" "}
            <button id='timerButton' ref='timerButton' onClick={this.startTimer}><strong>Start</strong></button>
          </div>
        </>
      )
    }
    else {
      return(
        <>
          <ActionCableConsumer
            channel={{channel: 'TimerChannel', id:`${this.props.gameId}`}}
            onReceived={this.handleReceivedTimer}
          />
          <div id="timerBox">Timer: {this.state.minutes} : {this.state.seconds}

          </div>
        </>
      )
    }

  }
}

export default Timer;
