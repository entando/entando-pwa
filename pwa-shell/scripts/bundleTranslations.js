const bundleTranslations = require('react-intl-translations-manager').default;

 bundleTranslations({
  messagesDirectory: '.messages',
  translationsDirectory: 'src/i18n/translations/',
  languages: ['it'],
});
