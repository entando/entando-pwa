import { get } from 'lodash';
import appId from 'appId';

const standaloneContentTypes = ['posts', 'todos'];

const defaultContentTypes = ['CNG', 'NWS'];
const contentType = get(window, `entando.${appId}.configuration["content-type"]`, null);

const contentTypes = contentType ? [contentType] : defaultContentTypes;

export default process.env.REACT_APP_STANDALONE === 'true' ? standaloneContentTypes : contentTypes;
