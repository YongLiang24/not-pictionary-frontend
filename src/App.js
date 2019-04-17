import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import GamesPage from './components/GamesPage';
import GameView from './containers/GameView'
import Login from './components/Login'

class App extends Component {


  render() {
    return (
      <Fragment>
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/games" component={GamesPage}/>
        <Route
          exact path="/:id/draw"
          render={(props)=> <GameView gameId={props.match.params.id} isDrawing = {true}/>}
        />
        <Route
          exact path="/:id/guess"
          render={(props)=> <GameView gameId={props.match.params.id} isDrawing = {false}/>}
        />
      </Router>
      </Fragment>
    );
  }
}

export default App;
