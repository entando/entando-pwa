import { 
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_TYPE_MAP,
  SET_SELECTED_CONTENT_TYPE,
  SET_CONTENT_FILTER,
} from 'state/types';

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

export const setContentTypeMap = payload => ({
  type: SET_CONTENT_TYPE_MAP,
  payload,
});

export const setSelectedContentType = payload => ({
  type: SET_SELECTED_CONTENT_TYPE,
  payload,
});
