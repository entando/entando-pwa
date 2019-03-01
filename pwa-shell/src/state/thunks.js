import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import {
  setContentList,
  setContentFilter,
  setSelectedContent,
  setContentTypeList,
  setSelectedContentType
} from 'state/actions';
import { getContentFiltersByContentType } from 'state/selectors';
import { getContentList, getContentDetail } from 'api/content';
import contentTypes from 'state/contentTypes';

export const navigateContentType = (contentType, pagination) => (dispatch, getState) => {
  dispatch(setSelectedContentType(contentType));
  const filter = {
    sorting: null,
    formValues: { typeCode: [contentType] },
    operators: { typeCode: FILTER_OPERATORS.EQUAL },
  };
  dispatch(setContentFilter(filter, contentType));
  const filters = getContentFiltersByContentType(getState());
  const contentSpecificParams = 'status=published&modelId=list';
  const params = filters ? `${convertToQueryString(filters)}&${contentSpecificParams}` : `?${contentSpecificParams}`;
  return dispatch(fetchContentList(params, pagination));
};

export const fetchContentList = (params, pagination) => dispatch => (
  new Promise(resolve => {
    getContentList(params, pagination)
      .then(res => res.json())
      .then(data => {
        dispatch(setContentList(data.payload));        
        dispatch(setSelectedContent(null));
        resolve();
      })
      .catch(() => {});
  })
);

export const fetchContentDetail = id => dispatch => (
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
