import React, { Component, Fragment } from 'react';
import './App.css';
import GameView from './components/GameView'

class App extends Component {
  render() {
    return (
      <Fragment>
        <GameView isDrawing = {true}/>
        <GameView isDrawing = {false}/>
      </Fragment>
    );
  }
}

export default App;
