import { get } from 'lodash';

export const getSelectedContentType = state => state.contentType.selected;

export const getContentTypeCodeList = state => get(state, 'contentType.codeList', []);

export const getDefaultContentTypeCode = state => get(state, 'contentType.codeList[0]');

export const getContentTypeMap = state => get(state, 'contentType.map', {});
