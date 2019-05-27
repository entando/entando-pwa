import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import store from 'state/store';
import itLocaleData from 'react-intl/locale-data/it';
import DefaultRedirectContainer from 'DefaultRedirectContainer';
import ApiManager from 'ApiManager';
import AppIntlProviderContainer from 'AppIntlProviderContainer';
import HomePageHead from 'HomePageHead';

import NetworkStatusContainer from 'ui/network/NetworkStatusContainer';
import ContentListContainer from 'ui/content-list/ContentListContainer';
import ContentDetailContainer from 'ui/content-detail/ContentDetailContainer';
import NotificationsContainer from 'ui/notifications/NotificationsContainer';
import ContentListTopBarContainer from 'ui/content-list/ContentListTopBarContainer';
import ContentDetailTopBarContainer from 'ui/content-detail/ContentDetailTopBarContainer';
import NotificationsTopBarContainer from 'ui/notifications/NotificationsTopBarContainer';

addLocaleData(itLocaleData);
const appLocale = 'it';

const routesData = [
  {
    path: '/notifications',
    cssTransitions: [
      {
        timeout: 250,
        classNames: 'topbar',
        Component: NotificationsTopBarContainer,
      },
      {
        timeout: 350,
        classNames: 'content-detail',
        Component: NotificationsContainer,
      },
    ],
  },
  {
    path: '/content/:contentType/:id',
    cssTransitions: [
      {
        timeout: 250,
        classNames: 'topbar',
        Component: ContentDetailTopBarContainer,
      },
      {
        timeout: 350,
        classNames: 'content-detail',
        Component: ContentDetailContainer,
      },
    ],
  },
  {
    path: '/content/:contentType',
    cssTransitions: [
      {
        timeout: 250,
        classNames: 'topbar',
        Component: ContentListTopBarContainer,
      },
      {
        timeout: 350,
        classNames: 'content-list',
        Component: ContentListContainer,
      },
    ],
  },
];

const routes = routesData.map(route => (
  <Route exact key={route.path} path={route.path}>
    {props => (
      <>
        {route.cssTransitions.map(
          ({ timeout, classNames, Component }, index) => (
            <CSSTransition
              key={`${route.path}_${index}`}
              in={props.match && props.match.isExact}
              unmountOnExit
              timeout={timeout}
              classNames={classNames}
            >
              <div className="App__page-wrapper">
                <Component {...props} />
              </div>
            </CSSTransition>
          ),
        )}
      </>
    )}
  </Route>
));

const App = () => (
  <StateProvider store={store}>
    <AppIntlProviderContainer locale={appLocale}>
      <HomePageHead />
      <NetworkStatusContainer>
        <ApiManager store={store}>
          <div className="App__transitions-wrapper">
            <Route exact path="/" component={DefaultRedirectContainer} />
            {routes}
          </div>
        </ApiManager>
      </NetworkStatusContainer>
    </AppIntlProviderContainer>
  </StateProvider>
);

export default App;
