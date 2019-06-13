import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getUsername, getToken } from '@entando/apimanager';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getContent = state => state.content;

export const getContentList = createSelector(
  getContent,
  content => content.list,
);

export const getContentListMeta = createSelector(
  getContent,
  content => content.listMeta,
);

export const getListHasMorePages = createSelector(
  getContentListMeta,
  meta => !!Object.keys(meta).length && meta.pageSize === meta.totalItems,
);

export const getSelectedContent = createSelector(
  getContent,
  content => content.selected,
);

export const getSelectedContentId = createSelector(
  getContent,
  content => get(content, 'selected.id'),
);

export const getSelectedContentIndexFromList = createSelector(
  [getSelectedContentId, getContentList],
  (contentId, contentList) => contentList.findIndex(el => el.id === contentId),
);

export const getNextToSelectedContent = createSelector(
  [getSelectedContentIndexFromList, getContentList],
  (contentIndex, contentList) => contentList[contentIndex + 1] || {},
);

export const getPreviousFromSelectedContent = createSelector(
  [getSelectedContentIndexFromList, getContentList],
  (contentIndex, contentList) => contentList[contentIndex - 1] || {},
);

export const getRequiresAuthMap = createSelector(
  getContent,
  content => content.requiresAuthMap,
);

export const getStandardFilters = createSelector(
  getContent,
  content => content.filters,
);

export const getCategoryFilters = createSelector(
  getContent,
  content => content.categoryFilters,
);

export const getSortingFilters = createSelector(
  getContent,
  content => content.sortingFilters,
);

export const isSearchResult = createSelector(
  getContent,
  content => content.isSearchResult,
);

export const isLoading = createSelector(
  getContent,
  content => content.isLoading,
);

export const getSelectedStandardFilters = createSelector(
  [getSelectedContentType, getStandardFilters],
  (selectedContentType, standardFilters) =>
    standardFilters[selectedContentType],
);

export const getSelectedCategoryFilters = createSelector(
  [getSelectedContentType, getCategoryFilters],
  (selectedContentType, categoryFilters) =>
    categoryFilters[selectedContentType] || [],
);

export const getSelectedSortingFilters = createSelector(
  [getSelectedContentType, getSortingFilters],
  (selectedContentType, sortingFilters) =>
    sortingFilters[selectedContentType] || [],
);

export const isUserLogged = createSelector(
  [getUsername, getToken],
  (username, token) => !!username && !!token,
);
