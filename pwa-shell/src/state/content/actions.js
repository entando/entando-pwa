import { 
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_FILTER,
  SET_SORTING_FILTER,
  SET_CATEGORY_FILTER,
} from 'state/content/types';

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

export const setSelectedContent = payload => ({
  type: SET_SELECTED_CONTENT,
  payload,
});
