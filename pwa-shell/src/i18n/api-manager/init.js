import { addLocaleData } from 'react-intl';
import enLocale from 'i18n/api-manager/locales/en';
import itLocale from 'i18n/api-manager/locales/it';
/* ('en' is included by default) */
import itLocaleData from 'react-intl/locale-data/it';
import { setCurrentLocale } from '@entando/utils';

addLocaleData(itLocaleData);
setCurrentLocale(itLocale);

export default itLocale;
export { itLocale, enLocale };
