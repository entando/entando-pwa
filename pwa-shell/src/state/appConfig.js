import { get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  contentTypes: ['NWS'],
  categoryRoots: {
    NWS: 'home',
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

export const sortingFilters = appConfig.sortingFilters;

export const categoryRootCodes = appConfig.categoryRoots;

export const contentTypeCodeList = appConfig.contentTypes;

export default appConfig;
