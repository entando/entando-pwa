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
import NetworkStatusContainer from 'ui/network/NetworkStatusContainer';

import ContentListContainer from 'ui/content-list/ContentListContainer';
import ContentDetailContainer from 'ui/content-detail/ContentDetailContainer';
import DefaultRedirect from 'DefaultRedirect';
import NotificationsContainer from 'ui/notifications/NotificationsContainer';
import HomePageHead from 'HomePageHead';

import * as serviceWorker from 'serviceWorker';
import 'fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/index.scss';


ReactDOM.render(
  <Provider store={store}>
    <HomePageHead />
    <NetworkStatusContainer>
      <Router>      
        <ApiManager store={store}>
          <Route exact path="/" component={DefaultRedirect} />
          <Route exact path="/content" component={ContentListContainer} />
          <Route exact path="/content/:id" component={ContentDetailContainer} />
          <Route exact path="/notifications" component={NotificationsContainer} />
        </ApiManager>      
      </Router>
    </NetworkStatusContainer>
  </Provider>,
  document.getElementById(appId)
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
