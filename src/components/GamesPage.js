import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { Redirect } from 'react-router-dom';

class GamesPage extends Component {
  state = {
    availableGames: [],
    gameName: '',
    redirect: false,
    currentGameId: ''
  }

  componentDidMount() {
    // initial load of available games
    fetch(`${API_ROOT}/game`)
      .then(response => response.json())
      .then(json => this.setState({
        availableGames: json}))
  }

  handleAddGames = (ev) =>{
    // ev.preventDefault()
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
      .then(this.setState({
        redirect:true,
        currentGameId: gameId
      }))
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.currentGameId}/guess`}/>
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        <div >
          <div id='drawRole' >
            Game Name:
            <form onSubmit={this.handleAddGames} action="http://localhost:3001/draw" target='_blank'>
              <input type='text' placeholder='game name' name='createGame' required/>
              <input type='submit' value='create game' />
            </form>
          </div>
          Available Games:
          <ul>
            {this.state.availableGames.map(game => {
              return (
                <li
                  key={game.id}
                  value={game}
                >
                  Game: {game.id}
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
        </div>
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
