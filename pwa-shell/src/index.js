import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';

import appId from 'appId';
import store from 'state/store';
import itLocaleData from 'react-intl/locale-data/it';
import locales from 'i18n/locales';

import ApiManager from 'ApiManager';
import NetworkStatusContainer from 'ui/network/NetworkStatusContainer';

import ContentListContainer from 'ui/content-list/ContentListContainer';
import ContentDetailContainer from 'ui/content-detail/ContentDetailContainer';
import DefaultRedirectContainer from 'DefaultRedirectContainer';
import NotificationsContainer from 'ui/notifications/NotificationsContainer';
import HomePageHead from 'HomePageHead';

import * as serviceWorker from 'serviceWorker';
import 'fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/index.scss';

addLocaleData(itLocaleData);
const appLocale = 'it';


ReactDOM.render(
  <IntlProvider
    locale={appLocale}
    defaultLocale="en"
    key={appLocale}
    messages={locales[appLocale]}
  >  
    <Provider store={store}>
      <HomePageHead />
      <NetworkStatusContainer>
        <Router>      
          <ApiManager store={store}>
            <Route exact path="/" component={DefaultRedirectContainer} />
            <Route exact path="/notifications" component={NotificationsContainer} />
            <Route exact path="/content/:contentType" component={ContentListContainer} />
            <Route exact path="/content/:contentType/:id" component={ContentDetailContainer} />
          </ApiManager>      
        </Router>
      </NetworkStatusContainer>
    </Provider>
  </IntlProvider>,
  document.getElementById(appId)
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
