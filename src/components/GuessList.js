import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider';

class GuessList extends Component {
  constructor() {
     super()
     this.state = {
      guessList: [],
      rejectedGuesses: []
     }
   }

  componentDidMount() {
     fetch(API_ROOT+`/game/${this.props.gameId}`)
     .then(resp => resp.json())
     .then(json => {
       if (json) {
       this.setState({
         guessList: json,
         rejectedGuesses: json
       })}
     })

   }

  handleClick = (ev) => {
     // ev.persist()
     const guessIdx = ev.target.id
     const guessAction = ev.target.name
     const guessText = ev.target.value
     const type = 'rejectGuess'

     fetch(API_ROOT+`/game/${this.props.gameId}`,{
       method: 'PATCH',
       headers: HEADERS,
       body: JSON.stringify({guessIdx, guessAction, guessText, type})
     })
      .then(response => response.json())
      .then(json => {
        if (json.message == 'Wrong!') {
          this.setState(prevState => ({
            rejectedGuesses: [...prevState.rejectedGuesses, json.guessText]
          })
        )}
      })
    
   }

   playerHasWon = () =>{
     console.log("winniner log")
     alert("this player has won. ")
   }

  handleReceivedGuess = (response) => {
    console.log(response)
    if (response.guess) {
      this.setState(prevState => ({
        guessList: [...prevState.guessList, response.guess],
      }))
    }
  }

  handleReceivedReject = (response) => {
    console.log('receive rejection', response)
    this.setState(prevState => ({
      rejectedGuesses: [...prevState.rejectedGuesses, response.guessText]
    }))
  }


  render() {
    if (this.props.isDrawing) {
      return (
        <Fragment>
          <ActionCableConsumer
            channel={{channel: 'GameFormChannel', id:`${this.props.gameId}`}}
            onReceived={this.handleReceivedGuess}
          />
          <ul>
            {this.state.guessList.map((guess, idx) => {
              return (
                <li key={idx}>{guess}
                  <button
                    id={idx}
                    name='Accept'
                    onClick={this.handleClick}
                    value={guess}
                  >
                    Accept
                  </button>
                  <button
                    id={idx}
                    name='Reject'
                    onClick={this.handleClick}
                    value={guess}
                  >
                    Reject
                  </button>
                </li>
              )})
            }
          </ul>
        </Fragment>
      )
    } else {
      return (
        <Fragment>

          <ActionCableConsumer
            channel={{
              channel: 'GuessesChannel',
              id:`${this.props.gameId}`
            }}
            onReceived={this.handleReceivedReject}
          />
          <ul>
            {this.state.rejectedGuesses.map((guess, idx) => {
              return <li key={idx} style={{textDecoration: 'line-through'}}>{guess}</li>
              })}
          </ul>
        </Fragment>
      )
    }
  }
}

export default GuessList
