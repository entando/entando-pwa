import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { createRefreshTokenParams } from 'api/login';
import 'i18n/api-manager/init';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { store } = props;
    config(store, () => {}, () => {}, {
      generateParams: token => createRefreshTokenParams(token),
      parseResults: response => (
        response.json()
          .then(json => (json.payload ? json.payload : json))
      ),
    });
    store.dispatch(setApi({
      domain: process.env.REACT_APP_DOMAIN,
      useMocks: process.env.REACT_APP_USE_MOCKS === 'true',
    }));

    if (useMocks(store.getState())) {
      store.dispatch(addToast(
        'This application is using mocks',
        TOAST_WARNING,
      ));
    }
  }

  render() {
    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    );
  }
}


ApiManager.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,  
};

export default ApiManager;
