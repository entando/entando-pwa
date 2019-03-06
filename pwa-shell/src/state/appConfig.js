import { get } from 'lodash';
import appId from 'appId';

const defaultAppConfig = {
  contents: {
    NWS: {
      order: [
        {
          type: 'date',
          entityAttr: 'Date',
          order: 'ASC',
        },
      ],
    },
    ANN: {
      order: [
        {
          type: 'date',
          entityAttr: 'StartDate',
          order: 'ASC',
        },
      ],
    },
  },
};

const appConfig = get(window, `entando.${appId}.configuration`, defaultAppConfig);

export const contentTypeCodeList = Object.keys(get(appConfig, 'contents', {}));

export default appConfig;
