import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { addErrors } from '@entando/messages';
import { contentTypeCodeList } from 'state/appConfig';
import { getCategory } from 'api/category';
import { getContents, getContent } from 'api/content';
import { getContentType } from 'api/contentType';
import { setCategoryList } from 'state/category/actions';
import {
  setSelectedContentType,
  setContentTypeMap
} from 'state/contentType/actions';
import {
  setContentList,
  setContentFilter,
  setSelectedContent,
} from 'state/content/actions';
import { getSelectedStandardFilters, getSelectedCategoryFilters } from 'state/content/selectors';
import { getCategoryRootCode } from 'state/category/selectors';

export const navigateContentType = (contentType, pagination) => (dispatch, getState) => {
  dispatch(setSelectedContentType(contentType));
  const filter = {
    formValues: { typeCode: [contentType] },
    operators: { typeCode: FILTER_OPERATORS.EQUAL },
  };
  dispatch(setContentFilter(filter, contentType));
  const state = getState();
  const filters = getSelectedStandardFilters(state);
  const categoryFilters = getSelectedCategoryFilters(state);
  
  const categoryParams = categoryFilters ? `&categories[0]=${categoryFilters}` : '';
  const contentSpecificParams = 'status=published&model=list';
  const params = filters 
    ? `${convertToQueryString(filters)}&${contentSpecificParams}${categoryParams}`
    : `?${contentSpecificParams}${categoryParams}`;
  dispatch(fetchContentList(params, pagination));
};

export const fetchContentList = (params, pagination) => async(dispatch) => {
  try {
    const response = await getContents(params, pagination);
    const json = await response.json();
    if (response.ok) {
      dispatch(setContentList(json.payload));
      dispatch(setSelectedContent(null));  
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (err) {
    dispatch(addErrors(err));
  }
}

export const fetchContentDetail = id => async(dispatch) => {
  try {
    const response = await getContent(id);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedContent(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }  
  } catch (err) {
    dispatch(addErrors(err));
  }
}

export const fetchContentTypeMap = () => async(dispatch) => {
  try {
    const responseList = await Promise.all(contentTypeCodeList.map(getContentType));
    const jsonList = await Promise.all(responseList.map(response => response.json()));
    const contentTypeList = jsonList.map(json => json.payload);    
    if (!responseList.map(res => res.ok).includes(false)) {
      const contentTypeMap = contentTypeList.reduce((acc, curr) => ({
        ...acc,
        [curr.code]: curr,
      }), {});
      dispatch(setContentTypeMap(contentTypeMap));
    } else {
      dispatch(addErrors(contentTypeList.reduce((acc, curr) => acc.concat(curr.errors), []).map(e => e.message)));
    }
  } catch (err) {
    dispatch(addErrors(err));
  }  
}

export const fetchCategoryList = () => async(dispatch, getState) => {
  try {
    const categoryRootCode = getCategoryRootCode(getState());
    const response = await getCategory(categoryRootCode);
    const json = await response.json();
    const categoryCodeList = json.payload.children;
    const responseList = await Promise.all(categoryCodeList.map(getCategory));
    const jsonList = await Promise.all(responseList.map(response => response.json()));
    const categoryList = jsonList.map(json => json.payload);    
    if (!responseList.map(res => res.ok).includes(false)) {
      dispatch(setCategoryList(categoryList));
    } else {
      dispatch(addErrors(categoryList.reduce((acc, curr) => acc.concat(curr.errors), []).map(e => e.message)));
    }
  } catch (err) {
    dispatch(addErrors(err));
  }
}
