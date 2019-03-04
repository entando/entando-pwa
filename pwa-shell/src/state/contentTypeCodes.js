import { get } from 'lodash';
import appId from 'appId';

const contentType = get(window, `entando.${appId}.configuration["content-type"]`, null);

const defaultContentTypeCodes = ['NWS', 'ANN'];
const contentTypeCodes = contentType ? [contentType] : defaultContentTypeCodes;

export default contentTypeCodes;
