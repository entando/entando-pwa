import { get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  sortingFilters: {
    NWS: [
      {
        type: 'date',
        entityAttr: 'Date',
        order: 'ASC',
      },
    ],
    ANN: [
      {
        type: 'date',
        entityAttr: 'StartDate',
        order: 'ASC',
      },
    ],  
  },
};

const appConfig = get(window, `entando.${appId}.configuration`, defaultAppConfig);

export const sortingFilters = appConfig.sortingFilters;

export const contentTypeCodeList = sortingFilters ? Object.keys(sortingFilters) : [];

export default appConfig;
