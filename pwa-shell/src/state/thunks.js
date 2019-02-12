import {
  setContentList,
  setContentDetail,
  setContentTypeList,
  setSelectedContentType
} from 'state/actions';
import { getContentList, getContentDetail } from 'api/content';

export const fetchContentList = (contentType) => dispatch => {
  getContentList(contentType)
    .then(res => res.json())
    .then(data => {
      dispatch(setContentList(data, { contentType }));
      dispatch(setSelectedContentType(contentType));
      dispatch(setContentDetail(null));
    })
};

export const fetchContentDetail = (contentType, id) => dispatch => {
  getContentDetail(contentType, id)
    .then(res => res.json())
    .then(data => {
      dispatch(setContentDetail(data));
    })
};

const mockContentTypes = ['posts', 'todos'];

export const fetchContentTypes = () => dispatch => {
  dispatch(setContentTypeList(mockContentTypes));
}