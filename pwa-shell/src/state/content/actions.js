import { 
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_FILTER,
} from 'state/content/types';

export const setContentFilter = (filter, contentType) => ({
  type: SET_CONTENT_FILTER,
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
