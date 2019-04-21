import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';

class GuessList extends Component {
  constructor(props) {
     super(props)
     this.state = {
      guessList: [],
      rejectedGuesses: [],
      guessValue: ''
     }
   }

  componentDidMount() {
    const movement = {
      isClear: "true"
    }
    fetch(API_ROOT + `/game/${this.props.gameId}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(movement)
    })

    setInterval(this.updateList, 3000)
   }

  handleClick = (ev) => {
     // ev.persist()
     const guessIdx = ev.target.id
     const guessAction = ev.target.name
     const guessText = ev.target.value
     fetch(API_ROOT+`/game/${this.props.gameId}`,{
       method: 'PATCH',
       headers: HEADERS,
       body: JSON.stringify({guessIdx, guessAction, guessText})
     })

   }

   updateList = ()=>{
     fetch(API_ROOT+`/game/${this.props.gameId}`)
     .then(resp => resp.json())
     .then(json =>{
       this.setState({
         guessList: json.guesses,
         rejectedGuesses: json.rejectList,
         guessValue: json.guessInput
       })
       if(json.is_won){
         alert('We have a winner, thank you for playing.')
         window.location = 'http://localhost:3000/games'
       }
     })
   }

   handleAccept = (ev) =>{

     const isReject = true
     // const guessIdx = ev.target.id
     const guessAction = ev.target.name
     fetch(API_ROOT+`/game/${this.props.gameId}`,{
       method: 'PATCH',
       headers: HEADERS,
       body: JSON.stringify({isReject, guessAction})
     })

   }


  render() {
    if (this.props.isDrawing) {
      this.acc || (this.acc = null)
      return (
        <Fragment>
          {this.acc}
          <h4>Guess List</h4>
          <ul>
            {this.state.guessList.map((guess, idx) => {
              return (
                <li key={idx}>{guess}
                  <button
                    id={idx}
                    name='Accept'
                    onClick={this.handleAccept}
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
      this.acc || (this.acc = null)
      return (
        <Fragment>
          {this.acc}
          <h4>Rejected Guess List</h4>
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
