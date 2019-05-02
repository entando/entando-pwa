import enLocale from 'i18n/api-manager/locales/en';
import itLocale from 'i18n/api-manager/locales/it';
/* ('en' is included by default) */
import { setCurrentLocale } from '@entando/utils';

setCurrentLocale(itLocale);

export default itLocale;
export { itLocale, enLocale };
