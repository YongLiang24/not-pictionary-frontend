import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
// import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);

// registerServiceWorker();
//serviceWorker.unregister();
