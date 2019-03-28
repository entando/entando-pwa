import { get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  contentTypes: ['NWS'],
  categoryRoots: {
    NWS: 'home',
  },
  categoryOrder: { //temporary, category order will be handled backend-side
    NWS: [
      'ìn_evidenza',
      'personale',
      'amministrazione',
      'benessere',
      'varie',
    ]
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

const appConfig = get(window, `entando.${appId}.configuration`, defaultAppConfig);

export const categoryOrder = appConfig.categoryOrder;

export const sortingFilters = appConfig.sortingFilters;

export const categoryRootCodes = appConfig.categoryRoots;

export const contentTypeCodeList = appConfig.contentTypes;

export default appConfig;
