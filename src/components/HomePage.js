import React, { Component, Fragment } from 'react';

class HomePage extends Component{

  state={
    availableGames: [],
    gameName: ''
  }

  handleAddGames = (ev) =>{
    // ev.preventDefault()
    let newGameArray = this.state.availableGames.slice()
    let input = ev.target.createGame.value
    if(!newGameArray.includes(input)){
      newGameArray.push(input)
    }
    else{
      ev.preventDefault()
      alert('This name already exist.')
    }

    this.setState({
      availableGames: newGameArray,
      gameName: input
    })


  }
  render(){
    return(
      <div>
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
            {  this.state.availableGames.map((game, index) =>{

              return <li key={index} name={game} value={game}><a  href={`http://localhost:3001/guess`} target="_blank">{game}</a> </li>
            })
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default HomePage;
