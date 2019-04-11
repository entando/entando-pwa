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

import TopBarContainer from 'ui/menu/TopBarContainer';
import ContentListContainer from 'ui/content-list/ContentListContainer';
import ContentDetailContainer from 'ui/content-detail/ContentDetailContainer';
import DefaultRedirectContainer from 'DefaultRedirectContainer';
import NotificationsContainer from 'ui/notifications/NotificationsContainer';
import NotificationsTopBarContainer from 'ui/notifications/NotificationsTopBarContainer';

import * as serviceWorker from 'serviceWorker';
import 'fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'sass/index.scss';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApiManager store={store}>
        <Route exact path="/" component={DefaultRedirectContainer} />
        <Route exact path="/notifications" render={props => (
          <React.Fragment><NotificationsTopBarContainer {...props} /><NotificationsContainer /></React.Fragment>
        )} />
        <Route exact path="/content/:contentType" render={props => (
          <React.Fragment><TopBarContainer {...props} /><ContentListContainer {...props} /></React.Fragment>
        )} />
        <Route exact path="/content/:contentType/:id" component={ContentDetailContainer} />
      </ApiManager>
      </Router>
  </Provider>,
  document.getElementById(appId)
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
