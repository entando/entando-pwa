import { get } from 'lodash';
import { createSelector } from 'reselect';

export const getSelectedContentType = state => state.contentType.selected;

export const getContentTypeCodeList = state => get(state, 'contentType.codeList', []);

export const getDefaultContentTypeCode = state => get(state, 'contentType.codeList[0]');

export const getContentTypeMap = state => get(state, 'contentType.map', {});

export const getContentFilters = state => state.content.filters;

export const getContentFiltersByContentType = createSelector(
  [getSelectedContentType, getContentFilters],
  (selectedContentType, contentFilters) => contentFilters[selectedContentType]
);

export const getContentList = state => get(state, 'content.list', []);

export const getSelectedContent = state => get(state, 'content.selected');
