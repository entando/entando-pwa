import {
  SET_CONTENT_LIST,
  PUSH_CONTENT_LIST,
  SET_CONTENT_LIST_META,
  SET_SELECTED_CONTENT,
  UNSET_SELECTED_CONTENT,
  SET_CONTENT_FILTER,
  SET_SORTING_FILTER,
  SET_CATEGORY_FILTER,
  SET_IS_SEARCH_RESULT,
  UNSET_IS_SEARCH_RESULT,
  SET_IS_LOADING,
  UNSET_IS_LOADING,
  SET_REQUIRES_AUTH,
} from 'state/content/types';

export const setIsSearchResult = () => ({
  type: SET_IS_SEARCH_RESULT,
});

export const unsetIsSearchResult = () => ({
  type: UNSET_IS_SEARCH_RESULT,
});

export const setIsLoading = () => ({
  type: SET_IS_LOADING,
});

export const unsetIsLoading = () => ({
  type: UNSET_IS_LOADING,
});

export const setContentFilter = (filter, contentType) => ({
  type: SET_CONTENT_FILTER,
  payload: {
    filter,
    contentType,
  },
});

export const setCategoryFilter = (filter, contentType) => ({
  type: SET_CATEGORY_FILTER,
  payload: {
    filter,
    contentType,
  },
});

export const setSortingFilter = (filter, contentType) => ({
  type: SET_SORTING_FILTER,
  payload: {
    filter,
    contentType,
  },
});

export const setContentList = payload => ({
  type: SET_CONTENT_LIST,
  payload,
});

export const pushContentList = payload => ({
  type: PUSH_CONTENT_LIST,
  payload,
});

export const setContentListMeta = payload => ({
  type: SET_CONTENT_LIST_META,
  payload,
});

export const setSelectedContent = payload => ({
  type: SET_SELECTED_CONTENT,
  payload,
});

export const unsetSelectedContent = () => ({
  type: UNSET_SELECTED_CONTENT,
});

export const setRequiresAuth = (id, requiresAuth) => ({
  type: SET_REQUIRES_AUTH,
  payload: {
    id,
    requiresAuth
  }
});
