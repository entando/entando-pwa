import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import appId from 'appId';

import store from 'state/store';

import TopBarContainer from 'ui/TopBarContainer';
import ContentListContainer from 'ui/ContentListContainer';
import ContentDetailContainer from 'ui/ContentDetailContainer';
import DefaultRedirectContainer from 'ui/DefaultRedirectContainer';

import * as serviceWorker from 'serviceWorker';

import 'index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <TopBarContainer />
        <Route exact path="/" component={DefaultRedirectContainer} />
        <Route exact path="/:contentType/" component={ContentListContainer} />
        <Route exact path="/:contentType/:id" component={ContentDetailContainer} />
      </div>
      </Router>
  </Provider>,
  document.getElementById(appId)
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
