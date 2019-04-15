import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
// import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants';

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Canvas from './components/Canvas';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);

ReactDOM.render(
  <div>
    <Router>
      <nav>
        <NavLink to="/">Home</NavLink>
        {' '}
        <NavLink to="/app">Canvas</NavLink>
      </nav>
      <div>
        <Route exact path="/" component={Canvas} />
        <Route exact path="/app" component={App} />
      </div>
    </Router>
  </div>
, document.getElementById('root'));

// registerServiceWorker();
serviceWorker.unregister();
