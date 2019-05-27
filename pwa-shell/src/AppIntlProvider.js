import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

class AppIntlProvider extends Component {
  componentDidMount() {
    this.props.initLanguage();
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

AppIntlProvider.propTypes = {
  initLanguage: PropTypes.func.isRequired,
}

export default AppIntlProvider;