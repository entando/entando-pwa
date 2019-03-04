import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { addErrors } from '@entando/messages';
import {
  setContentList,
  setContentFilter,
  setSelectedContent,
  setContentTypeList as setContentTypeCodes,
  setSelectedContentType,
  setContentTypeMap
} from 'state/actions';
import { getContentFiltersByContentType } from 'state/selectors';
import { getContentList, getContentDetail } from 'api/content';
import contentTypeCodes from 'state/contentTypeCodes';
import { getContentType } from 'api/contentType';

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

export const fetchContentList = (params, pagination) => async(dispatch) => {
  try {
    const response = await getContentList(params, pagination);
    const json = await response.json();
    if (!response.ok) {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
    dispatch(setContentList(json.payload));
    dispatch(setSelectedContent(null));
    return json;
  } catch (err) {
    dispatch(addErrors(err));
    return [];
  }
}

export const fetchContentDetail = id => async(dispatch) => {
  try {
    const response = await getContentDetail(id);
    const json = await response.json();
    if (!response.ok) {
      dispatch(addErrors(json.errors.map(e => e.message)));
    } else {
      dispatch(setSelectedContent(json));
    }  
    return json;  
  } catch (err) {
    dispatch(addErrors(err));
    return {};
  }
}

export const fetchContentTypeCodes = () => dispatch => (
  dispatch(setContentTypeCodes(contentTypeCodes))
);

export const fetchContentTypeMap = () => async(dispatch) => {
  try {
    const responseList = await Promise.all(contentTypeCodes.map(getContentType));
    const contentTypeList = await Promise.all(responseList).map(response => response.json());
    const contentTypeMap = contentTypeList.reduce((acc, curr) => ({
      ...acc,
      [curr.code]: curr,
    }), {});
    dispatch(setContentTypeMap(contentTypeMap));
  } catch (err) {
    dispatch(addErrors(err));
    return {};
  }  
}
