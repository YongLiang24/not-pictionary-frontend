import React, { Component, Fragment } from 'react';
import './App.css';
import GameView from './containers/GameView'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <Fragment>
      <Router>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/draw" component={()=> <GameView isDrawing = {true}/>} />
        <Route exact path="/guess" component={()=> <GameView isDrawing = {false}/>} />
      </Router>
      </Fragment>
    );
  }
}

export default App;
