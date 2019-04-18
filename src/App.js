import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import GamesPage from './components/GamesPage';
import GameView from './containers/GameView'
import Login from './components/Login'
import TopNav from './components/TopNav'


class App extends Component {
  render() {
    return (
      <Fragment>
      <Router>
        <Route exact path="/" component={Login}/>
        <Route
          exact path="/games"
          // component={GamesPage}
          render={() => (
            <Fragment>
              <TopNav />
              <GamesPage />
            </Fragment>
          )}
        />
        <Route
          exact path="/:id/draw"
          render={(props)=> (
            <Fragment>
              <TopNav />
              <GameView gameId={props.match.params.id} isDrawing = {true}/>
            </Fragment>
          )}
        />
        <Route
          exact path="/:id/guess"
          render={(props) => (
            <Fragment>
              <TopNav />
              <GameView gameId={props.match.params.id} isDrawing = {false}/>
            </Fragment>
          )}
        />
      </Router>
      </Fragment>
    );
  }
}

export default App;
