import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setLanguage } from 'state/language/actions';

class AppLanguage extends Component {
  constructor(props) {
    super(props);
    this.initLanguageSetter(props);
  }

  initLanguageSetter(props) {
    const { store } = props;
    if (props.lang) {
      store.dispatch(setLanguage(props.lang));
    }
  }
  render() {
    return <></>;
  }
}

AppLanguage.propTypes = {
  store: PropTypes.object.isRequired,
};

export default AppLanguage;
