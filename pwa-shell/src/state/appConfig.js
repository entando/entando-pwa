import { defaults, get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  defaultLanguageCode: 'en',
  languageCode: 'it',
  contentTypeCodeList: ['NWS'],
  categoryRootCodes: {
    NWS: 'home',
  },
  categoryOrder: {
    NWS: [
      'ìn_evidenza',
      'news',
      'personale',
      'amministrazione',
      'benessere',
      'varie',
    ],
  },
  sortingFilters: {
    NWS: [
      {
        type: 'date',
        entityAttr: 'Date',
        order: 'DESC',
      },
    ],
  },
};

const injectedAppConfig = get(window, `entando.${appId}.configuration`);

const appConfig = defaults({}, injectedAppConfig, defaultAppConfig);

export const categoryOrder = appConfig.categoryOrder;

export const sortingFilters = appConfig.sortingFilters;

export const categoryRootCodes = appConfig.categoryRootCodes;

export const contentTypeCodeList = appConfig.contentTypeCodeList;

export const defaultLanguageCode = appConfig.defaultLanguageCode;

export const languageCode = appConfig.languageCode;
