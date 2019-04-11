import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getUsername, getToken } from '@entando/apimanager';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getContent = state => state.content;

export const getContentList = createSelector(
  getContent,
  content => content.list,
);

export const getSelectedContent = createSelector(
  getContent,
  content => content.selected,
);

export const getSelectedContentId = createSelector(
  getContent,
  content => get(content, 'selected.id')
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
  (selectedContentType, standardFilters) => standardFilters[selectedContentType]
);

export const getSelectedCategoryFilters = createSelector(
  [getSelectedContentType, getCategoryFilters],
  (selectedContentType, categoryFilters) => categoryFilters[selectedContentType] || []
);

export const getSelectedSortingFilters = createSelector(
  [getSelectedContentType, getSortingFilters],
  (selectedContentType, sortingFilters) => sortingFilters[selectedContentType] || []
);

export const isUserLogged = createSelector(
  [getUsername, getToken],
  (username, token) => !!username && !!token
);

export const doesSelectedContentRequireAuth = createSelector(
  [getSelectedContentId, getRequiresAuthMap],
  (selectedContentId, requiresAuthMap) => requiresAuthMap[selectedContentId] !== false
);

export const isSelectedContentAvailable = createSelector(
  [doesSelectedContentRequireAuth, isUserLogged],
  (requiresAuth, userLogged) => !requiresAuth || userLogged
);
