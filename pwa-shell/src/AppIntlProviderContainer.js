import { connect } from 'react-redux';
import locales from 'i18n/locales';
import { setLanguage } from 'state/language/actions';
import AppIntlProvider from 'AppIntlProvider';

export const mapStateToProps = (state, { locale }) => ({
  locale,
  defaultLocale: 'en',
  messages: locales[locale],
});

export const mapDispatchToProps = (dispatch, { locale }) => ({
  initLanguage: () => dispatch(setLanguage(locale)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppIntlProvider);
