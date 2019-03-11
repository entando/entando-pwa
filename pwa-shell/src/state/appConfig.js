import { get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  contentTypes: ['NWS', 'ANN'],
  categoryRoots: {
    NWS: 'sme_root',
    ANN: 'sme_root',
  },
  sortingFilters: {
    NWS: [
      {
        type: 'date',
        entityAttr: 'Date',
        order: 'DESC',
      },
    ],
    ANN: [
      {
        type: 'date',
        entityAttr: 'StartDate',
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
