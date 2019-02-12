import {
  setContentList,
  setSelectedContent,
  setContentTypeList,
  setSelectedContentType
} from 'state/actions';
import { getContentList, getContentDetail } from 'api/content';

export const fetchContentList = contentType => dispatch => (
  new Promise(resolve => {
    getContentList(contentType)
      .then(res => res.json())
      .then(data => {
        dispatch(setContentList(data, { contentType }));
        dispatch(setSelectedContentType(contentType));
        dispatch(setSelectedContent(null));
        resolve();
      })
      .catch(() => {});
  })
);

export const fetchContentDetail = (contentType, id) => dispatch => (
  new Promise(resolve => {
    getContentDetail(contentType, id)
      .then(res => res.json())
      .then(data => {
        dispatch(setSelectedContent(data));
        resolve();
      })
      .catch(() => {});
  })
);  

const mockContentTypes = ['posts', 'todos'];

export const fetchContentTypes = () => dispatch => {
  dispatch(setContentTypeList(mockContentTypes));
}