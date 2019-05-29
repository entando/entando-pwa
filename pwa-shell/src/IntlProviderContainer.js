import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import locales from 'i18n/locales';
import {
  getDefaultLanguageCode,
  getLanguageCode,
} from 'state/language/selectors';

export const mapStateToProps = state => {
  const locale = getLanguageCode(state);
  return {
    locale,
    defaultLocale: getDefaultLanguageCode(state),
    key: locale,
    messages: locales[locale],
  };
};

export default connect(
  mapStateToProps,
  null,
)(IntlProvider);
