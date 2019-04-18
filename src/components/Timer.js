import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider';

class Timer extends Component{
  state={
    seconds: 59,
    minutes: 1,
    interval: ''
  }

  startTimer = (e)=>{
    this.state.interval = setInterval(this.timer, 1000)
    // let clickedButton = this.refs.timerButton
    // clickedButton.disabled = true;
    console.log('checkStartTimer')
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
      this.setState({
        seconds: 0,
        minutes: 0
      })

      setTimeout(alert("Time's Up, Click 'Ok' to end the game"), 3000)
      clearInterval(this.state.interval)
      window.location = 'http://localhost:3001/games'
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
          <ActionCableConsumer
            channel={{channel: 'TimerChannel', id:`${this.props.gameId}`}}
            onReceived={this.handleReceivedTimer}
          />
          <div id="timerBox">Timer: {this.state.minutes} : {this.state.seconds}

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
