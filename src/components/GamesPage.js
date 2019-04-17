import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { Redirect } from 'react-router-dom';

class GamesPage extends Component {
  state = {
    availableGames: [],
    gameName: '',
    redirect: false,
    currentGameId: '',
    currentGameMode: ''
  }

  componentDidMount() {
    // initial load of available games
    fetch(`${API_ROOT}/game`)
      .then(response => response.json())
      .then(json => this.setState({
        availableGames: json}))
  }

  // add websocket listener to pull in new created games

  handleAddGames = (ev) =>{
    ev.preventDefault()
    // let newGameArray = this.state.availableGames.slice()
    // let input = ev.target.createGame.value
    // if(!newGameArray.includes(input)){
    //   newGameArray.push(input)
    // }
    // else{
    //   ev.preventDefault()
    //   alert('This name already exist.')
    // }
    //
    // this.setState({
    //   availableGames: newGameArray,
    //   gameName: input
    // })
    console.log('adding new game')
    const playerId = JSON.parse(localStorage.getItem('playerData')).playerId
    const gameName = ev.target.createGame.value

    fetch(`${API_ROOT}/game`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({playerId, gameName})
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          redirect:true,
          currentGameId: json.id,
          currentGameMode: 'draw'
        })
      })
      // .then(
      //   this.setState({
      //     redirect:true,
      //     currentGameId: gameId
      // }))
  }

  handleJoiningGame = (ev) => {
    // post player joining game, redirect to game page
    const playerId = JSON.parse(localStorage.getItem('playerData')).playerId
    const gameId = ev.target.id

    fetch(`${API_ROOT}/game/${gameId}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({playerId})
    })
      .then(
        this.setState({
          redirect:true,
          currentGameId: gameId,
          currentGameMode: 'guess'
      }))
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.currentGameId}/${this.state.currentGameMode}`}/>
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}

            Game Name:
            <form onSubmit={this.handleAddGames} >
              <input type='text' placeholder='game name' name='createGame' required/>
              <input type='submit' value='create game' />
            </form>
          Available Games:
          <ul>
            {this.state.availableGames.map(game => {
              return (
                <li
                  key={game.id}
                  value={game}
                >
                  Game: {game.id}
                  Name: {game.name}
                  <p>Drawer: {game.drawer_id}</p>
                  <button
                    id={game.id}
                    name={game.id}
                    onClick={this.handleJoiningGame}
                  >
                    Join Game
                  </button>
                  {/* <a href={`http://localhost:3001/guess`} target="_blank">{game}</a>  */}
                </li>
              )
            })
            }
          </ul>
      </Fragment>
    )
  }
}
export default GamesPage;

// answer: "Pie"
// created_at: "2019-04-16T20:19:23.386Z"
// drawer_id: 1
// guesser_id: 2
// guesses: null
// id: 1
// is_active: true
// updated_at: "2019-04-16T20:26:04.999Z"
