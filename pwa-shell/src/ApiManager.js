import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import 'i18n/api-manager/init';
import withAuth from 'auth/withAuth';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { store, auth } = props;
    config(store, () => auth.login(), () => {});
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

export default withAuth(ApiManager);
