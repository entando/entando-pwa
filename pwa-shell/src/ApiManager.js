import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { setLanguage } from 'state/language/actions';
import 'i18n/api-manager/init';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager(props);
  }

  initApiManager(props) {
    const { store } = props;
    config(store, () => {}, () => {});
    store.dispatch(setApi({
      domain: process.env.REACT_APP_DOMAIN,
      useMocks: process.env.REACT_APP_USE_MOCKS === 'true',
    }));
    
    if (props.lang) {
      store.dispatch(setLanguage(props.lang));
    }

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
