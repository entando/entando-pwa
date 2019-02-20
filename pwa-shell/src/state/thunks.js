import {
  setContentList,
  setSelectedContent,
  setContentTypeList,
  setSelectedContentType
} from 'state/actions';
import { getContentList, getContentDetail } from 'api/content';
import contentTypes from 'state/contentTypes';

export const fetchContentList = contentType => dispatch => (
  new Promise(resolve => {
    getContentList(contentType)
      .then(res => res.json())
      .then(data => {
        dispatch(setSelectedContentType(contentType));
        dispatch(setContentList(data.payload));        
        dispatch(setSelectedContent(null));
        resolve();
      })
      .catch(() => {});
  })
);

export const fetchContentDetail = (contentType, id) => dispatch => (
  new Promise(resolve => {
    getContentDetail(id)
      .then(res => res.json())
      .then(data => {
        dispatch(setSelectedContent(data));
        resolve();
      })
      .catch(() => {});
  })
);  

export const fetchContentTypes = () => dispatch => {
  dispatch(setContentTypeList(contentTypes));
}