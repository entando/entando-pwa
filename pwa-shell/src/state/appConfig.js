import { get } from 'lodash';
import appId from 'appId';
import { ALL_CONTENT_TYPES } from 'state/const';

const defaultAppConfig = {
  contentTypes: ['NWS'],
  categoryRoots: {
    [ALL_CONTENT_TYPES]: 'home',
  },
  categoryOrder: { // temporary, category order will be handled backend-side
    [ALL_CONTENT_TYPES]: [
      'ìn_evidenza',
      'personale',
      'amministrazione',
      'benessere',
      'varie',
    ],
  },
  sortingFilters: {
    [ALL_CONTENT_TYPES]: [
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
