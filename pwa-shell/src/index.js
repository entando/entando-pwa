import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import appId from 'appId';

import store from 'state/store';

import ApiManager from 'ApiManager';

import TopBarContainer from 'ui/TopBarContainer';
import ContentListContainer from 'ui/ContentListContainer';
import ContentDetailTopBarContainer from 'ui/ContentDetailTopBarContainer';
import ContentDetailContainer from 'ui/ContentDetailContainer';
import DefaultRedirectContainer from 'ui/DefaultRedirectContainer';

import * as serviceWorker from 'serviceWorker';
import 'fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'sass/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApiManager store={store}>
        <div>
          <Route exact path="/" component={DefaultRedirectContainer} />
          <Route exact path="/:contentType/" render={props => (
            <div><TopBarContainer /><ContentListContainer {...props} /></div>
          )} />
          <Route exact path="/:contentType/:id" render={props => (
            <div><ContentDetailTopBarContainer /><ContentDetailContainer {...props} /></div>
          )} />
        </div>
      </ApiManager>
      </Router>
  </Provider>,
  document.getElementById(appId)
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
