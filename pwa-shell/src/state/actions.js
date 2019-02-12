import { 
  SET_CONTENT_LIST,
  SET_SELECTED_CONTENT,
  SET_CONTENT_TYPE_LIST,
  SET_SELECTED_CONTENT_TYPE,
} from "./types";

export const setContentList = (payload, meta = null) => {
  return {
    type: SET_CONTENT_LIST,
    payload,
    meta,
  }
};

export const setSelectedContent = payload => {
  return {
    type: SET_SELECTED_CONTENT,
    payload,
  }
};

export const setContentTypeList = payload => {
  return {
    type: SET_CONTENT_TYPE_LIST,
    payload,
  }
};

export const setSelectedContentType = payload => {
  return {
    type: SET_SELECTED_CONTENT_TYPE,
    payload,
  }
};
