import React from 'react';

import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

addLocaleData(itLocaleData);
const appLocale = 'it';

const App = ({ location }) => (
  <IntlProvider
    locale={appLocale}
    defaultLocale="en"
    key={appLocale}
    messages={locales[appLocale]}
  >  
    <Provider store={store}>
      <HomePageHead />
      <NetworkStatusContainer>        
        <ApiManager store={store}>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={location.state && location.state.transition ? { enter: 500, exit: 500 } : 0}
              classNames={location.state ? location.state.transition : ''}
            >            
              <Switch location={location}>
                <Route exact path="/" component={DefaultRedirectContainer} />                
                <Route exact path="/notifications" component={NotificationsContainer} />
                <Route exact path="/content/:contentType" component={ContentListContainer} />
                <Route exact path="/content/:contentType/:id" component={ContentDetailContainer} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </ApiManager>      
      </NetworkStatusContainer>
    </Provider>
  </IntlProvider>
);

export default withRouter(App);
