import { get } from 'lodash';
import appId from 'appId';

const contentType = get(window, `entando.${appId}.configuration["content-type"]`, null);

const defaultContentTypes = ['NWS', 'ANN'];
const contentTypes = contentType ? [contentType] : defaultContentTypes;

export default contentTypes;
