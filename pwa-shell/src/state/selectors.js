import { get } from 'lodash';
import { createSelector } from 'reselect';

export const getSelectedContentType = state => state.contentType.selected;

export const getContentFilters = state => state.content.filters;

export const getContentFiltersByContentType = createSelector(
  [getSelectedContentType, getContentFilters],
  (selectedContentType, contentFilters) => contentFilters[selectedContentType]
);

export const getSelectedContent = state => get(state, 'content.selected.payload');
