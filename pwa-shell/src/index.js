import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import appId from 'appId';
import * as serviceWorker from 'serviceWorker';

import App from 'App';

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/index.scss';
import 'fontawesome';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById(appId),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
