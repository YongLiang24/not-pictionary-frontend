import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';

// import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants';
import * as serviceWorker from './serviceWorker';

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });
ReactDOM.render(
  <Router history={hashHistory}>
    <App />
  </Router>,
  document.getElementById('root')
);

// registerServiceWorker();
serviceWorker.unregister();
