import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getContentFilters = state => state.content.filters; //TODO perché questo content filters e quello dopo category filters?
export const getCategoryFilters = state => state.content.categoryFilters;

export const getContentFiltersByContentType = createSelector(
  [getSelectedContentType, getContentFilters],
  (selectedContentType, contentFilters) => contentFilters[selectedContentType]
);

export const getSelectedCategoryFilters = createSelector(
  [getSelectedContentType, getCategoryFilters],
  (selectedContentType, categoryFilters) => categoryFilters[selectedContentType]
);

export const getContentList = state => get(state, 'content.list', []);

export const getSelectedContent = state => get(state, 'content.selected');
