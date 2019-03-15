import { get } from 'lodash';
import { convertToQueryString } from '@entando/utils';
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
  setSelectedContent,
} from 'state/content/actions';
import { getSelectedStandardFilters, getSelectedCategoryFilters, getSelectedSortingFilters } from 'state/content/selectors';
import { getCategoryRootCode } from 'state/category/selectors';

const toCategoryQueryString = categories => {
  return categories && categories.length
   ? categories.reduce((acc, curr, i) => {
    return `${acc}&categories[${i}]=${curr}`;
   }, '&orClauseCategoryFilter=true')
   : '';
}

const toSortingQueryString = (sortingFilters, standardFilters) => {
  // WORKAROUND to get the filter index: we need to refactor Entando utils query string manager
  // in order to handle all queryString generation scenarios
  const sortingfFilterStartingIndex = Object.keys(get(standardFilters, 'formValues', {})).length;

  return sortingFilters && sortingFilters.length
   ? sortingFilters.reduce((acc, curr, i) => {
    return `${acc}&filters[${sortingfFilterStartingIndex + i}].type=${curr.type}`
      + `${acc}&filters[${sortingfFilterStartingIndex + i}].entityAttr=${curr.entityAttr}`
      + `${acc}&filters[${sortingfFilterStartingIndex + i}].order=${curr.order}`
   }, '')
   : '';
}

export const fetchContentListByContentType = (contentType, pagination) => (dispatch, getState) => {
  dispatch(setSelectedContentType(contentType));
  const state = getState();
  const filters = getSelectedStandardFilters(state);
  const categoryFilters = getSelectedCategoryFilters(state);
  const sortingFilters = getSelectedSortingFilters(state);
  const categoryParams = toCategoryQueryString(categoryFilters);
  const sortingParams = toSortingQueryString(sortingFilters, filters);
  const contentSpecificParams = '&status=published&model=list';
  const params = `${convertToQueryString(filters)}${categoryParams}${sortingParams}${contentSpecificParams}`;
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
    if (!categoryRootCode) {
      dispatch(setCategoryList([]));
      return;
    }
    const response = await getCategory(categoryRootCode);
    const json = await response.json();
    if (response.ok) {
      dispatch(setCategoryList(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (err) {
    dispatch(addErrors(err));
  }
}
