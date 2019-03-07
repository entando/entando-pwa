import { SET_CONTENT_TYPE_MAP, SET_SELECTED_CONTENT_TYPE } from 'state/contentType/types';

export const setContentTypeMap = payload => ({
  type: SET_CONTENT_TYPE_MAP,
  payload,
});

export const setSelectedContentType = payload => ({
  type: SET_SELECTED_CONTENT_TYPE,
  payload,
});
