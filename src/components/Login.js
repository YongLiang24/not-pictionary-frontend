import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { API_ROOT, HEADERS } from '../constants';

class Login extends Component {
  state = {
    playerName: '',
    playerId: '',
    redirect: false
  }

  handleForm = (ev) => {
    ev.preventDefault()
    console.log('logging in', ev.target.login.value)

    let name = ev.target.login.value

    fetch(`${API_ROOT}/player`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({name})
    })
      .then(response => response.json())
      .then(json => {
        const player = {name: json.name, id: json.id}
        console.log('before setting state')
        this.setState({
          playerName: player.name,
          playerId: player.id,
          redirect: true
        })
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      localStorage.setItem('playerData', JSON.stringify(this.state))
      return <Redirect to='/games'/>
    }
  }

  render() {
    return (
      <div className='login'>
        {this.renderRedirect()}
        <h1>Welcome to Not-Pictionary</h1>
        <h4><em>Draw with your friends... or strangers!</em></h4>
        <form onSubmit={this.handleForm}>
          <label>Player Name:
            <input type='text' name='login' required/>
          </label>
          <input type='submit' value='Play!' />
        </form>
      </div>
    )
  }
}

export default Login;
