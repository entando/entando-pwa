import { get } from 'lodash';
import { createSelector } from 'reselect';
import { ALL_CONTENT_TYPES } from 'state/const';

export const getContentType = state => state.contentType;

export const getSelectedContentType = createSelector( //TODO rename to getSelectedContentTypeCode
  getContentType,
  contentType => get(contentType, 'selected', ALL_CONTENT_TYPES),
);

export const getContentTypeCodeList = createSelector(
  getContentType,
  contentType => get(contentType, 'codeList', []),
);

export const getContentTypeMap = createSelector(
  getContentType,
  contentType => get(contentType, 'map', {}),
);
