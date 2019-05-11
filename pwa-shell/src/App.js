import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import {
  Route,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import store from 'state/store';
import itLocaleData from 'react-intl/locale-data/it';
import locales from 'i18n/locales';
import DefaultRedirectContainer from 'DefaultRedirectContainer';
import ApiManager from 'ApiManager';
import HomePageHead from 'HomePageHead';

import NetworkStatusContainer from 'ui/network/NetworkStatusContainer';
import ContentListContainer from 'ui/content-list/ContentListContainer';
import ContentDetailContainer from 'ui/content-detail/ContentDetailContainer';
import NotificationsContainer from 'ui/notifications/NotificationsContainer';

addLocaleData(itLocaleData);
const appLocale = 'it';

const App = () => (  
  <IntlProvider
    locale={appLocale}
    defaultLocale="en"
    key={appLocale}
    messages={locales[appLocale]}
  >    
    <StateProvider store={store}>
      <HomePageHead />
      <NetworkStatusContainer>        
        <ApiManager store={store}>
        <div className="App__transitions-wrapper">
          <Route exact path="/" component={DefaultRedirectContainer} />                
          <Route exact path="/notifications" component={NotificationsContainer} />
          <Route exact path="/content/:contentType/:id">
            {
              props => (
                <CSSTransition
                  in={props.match && props.match.isExact}
                  timeout={350}
                  classNames="content-detail"
                  unmountOnExit
                >
                  <div className="App__page-wrapper"><ContentDetailContainer {...props} /></div>                  
                </CSSTransition>
              )
            }  
          </Route>
          <Route exact path="/content/:contentType">
            {
              props => (
                <CSSTransition
                  in={props.match && props.match.isExact}
                  timeout={350}
                  classNames="content-list"
                  unmountOnExit
                >
                  <div className="App__page-wrapper"><ContentListContainer {...props} /></div>
                </CSSTransition>
              )
            }  
          </Route>         
          </div> 
        </ApiManager>
      </NetworkStatusContainer>
    </StateProvider>
  </IntlProvider>
);

export default App;
