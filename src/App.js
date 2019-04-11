import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Canvas
          isDrawing={true}
        />
        <Canvas
          isDrawing={false}
        />
      </Fragment>
    );
  }
}

export default App;
