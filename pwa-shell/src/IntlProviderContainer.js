import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { setLanguage } from 'state/language/actions';
import { IntlProvider } from 'react-intl';

class IntlProviderContainer extends Component {
  constructor(props) {
    super(props);
    this.initLanguageSetter(props);
  }
  initLanguageSetter(props) {
    const { store, locale } = props;
    store.dispatch(setLanguage(locale));
  }
  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        key={locale}
        messages={messages}
      >
        <Fragment>{children}</Fragment>
      </IntlProvider>
    );
  }
}

IntlProviderContainer.propTypes = {
  store: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  messages: PropTypes.object.isRequired,
};

export default IntlProviderContainer;
