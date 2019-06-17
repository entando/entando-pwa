import { get } from 'lodash';
import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';
import PropTypes from 'prop-types';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import 'i18n/api-manager/init';

const useKeycloak =
  get(process.env, 'REACT_APP_AUTH_TYPE', '').toUpperCase() === 'KEYCLOAK';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { store } = props;
    config(
      store,
      () => {
        if (useKeycloak) {
          this.props.keycloak.login();
        } else {
          console.log('should load login page');
        }
      },
      () => {},
    );
    store.dispatch(
      setApi({
        domain: process.env.REACT_APP_DOMAIN,
        useMocks: process.env.REACT_APP_USE_MOCKS === 'true',
      }),
    );

    if (useMocks(store.getState())) {
      store.dispatch(
        addToast('This application is using mocks', TOAST_WARNING),
      );
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

ApiManager.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default (useKeycloak ? withKeycloak(ApiManager) : ApiManager);
