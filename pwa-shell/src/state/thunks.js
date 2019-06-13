import { get } from 'lodash';
import { convertToQueryString } from '@entando/utils';
import { getToken } from '@entando/apimanager';
import {
  addErrors,
  clearErrors,
  getToasts,
  removeToast,
} from '@entando/messages';
import { loginUser } from '@entando/apimanager';

import { getCategoryTree } from 'api/category';
import {
  getContents,
  getContent,
  getProtectedContent,
  getProtectedContents,
} from 'api/content';
import { getContentType } from 'api/contentType';
import { login as performLogin } from 'api/login';
import { getNotifications, postClearNotifications } from 'api/notification';
import { getUserProfile } from 'api/userProfile';
import { setUserProfile } from 'state/user-profile/actions';

import { categoryOrder, contentTypeCodeList } from 'state/appConfig';
import { setCategoryList } from 'state/category/actions';
import {
  setSelectedContentType,
  setContentTypeMap,
} from 'state/contentType/actions';
import {
  setContentList,
  pushContentList,
  setContentListMeta,
  setSelectedContent,
  setCategoryFilter,
  setIsSearchResult,
  unsetIsSearchResult,
  setIsLoading,
  unsetIsLoading,
  unsetSelectedContent,
  setRequiresAuthMap,
} from 'state/content/actions';
import { setSearch } from 'state/search/actions';
import {
  getSelectedStandardFilters,
  getSelectedCategoryFilters,
  getSelectedSortingFilters,
  getCategoryFilters,
} from 'state/content/selectors';
import { getCategoryRootCode } from 'state/category/selectors';
import { getSelectedContentType } from 'state/contentType/selectors';
import { getLanguageCode } from 'state/language/selectors';
import {
  setNotificationList,
  removeNotification,
} from 'state/notification/actions';
import { htmlSanitizer } from 'helpers';
import { getNotificationObjectIdList } from 'state/notification/selectors';

const toCategoryQueryString = categories => {
  return categories && categories.length
    ? categories.reduce((acc, curr, i) => {
        return `${acc}&categories[${i}]=${curr}`;
      }, '&orClauseCategoryFilter=true')
    : '';
};

const toSortingQueryString = (sortingFilters, standardFilters) => {
  // WORKAROUND to get the filter index: we need to refactor Entando utils query string manager
  // in order to handle all queryString generation scenarios
  const sortingfFilterStartingIndex = Object.keys(
    get(standardFilters, 'formValues', {}),
  ).length;

  return sortingFilters && sortingFilters.length
    ? sortingFilters.reduce((acc, curr, i) => {
        return (
          `${acc}&filters[${sortingfFilterStartingIndex + i}].type=${
            curr.type
          }` +
          `${acc}&filters[${sortingfFilterStartingIndex + i}].entityAttr=${
            curr.entityAttr
          }` +
          `${acc}&filters[${sortingfFilterStartingIndex + i}].order=${
            curr.order
          }`
        );
      }, '')
    : '';
};

export const fetchContentListByContentType = (
  contentType,
  pagination,
  search = null,
) => (dispatch, getState) => {
  dispatch(setSelectedContentType(contentType));
  const state = getState();
  const filters = getSelectedStandardFilters(state);
  const categoryFilters = getSelectedCategoryFilters(state);
  const sortingFilters = getSelectedSortingFilters(state);
  const languageCode = getLanguageCode(state);
  const categoryParams = toCategoryQueryString(categoryFilters);
  const sortingParams = toSortingQueryString(sortingFilters, filters);
  const contentSpecificParams = '&status=published&model=list';
  const searchParams = search ? `&text=${search}` : '';
  const languageParams = `&lang=${languageCode}`;
  if (search) {
    dispatch(setIsSearchResult());
    dispatch(setSearch(search));
  } else {
    dispatch(unsetIsSearchResult());
  }
  const params = `${convertToQueryString(
    filters,
  )}${categoryParams}${sortingParams}${contentSpecificParams}${searchParams}${languageParams}`;
  dispatch(fetchContentList(params, pagination));
};

const fetchContentList = (params, pagination) => async (dispatch, getState) => {
  try {
    dispatch(setIsLoading());
    const token = getToken(getState());
    const response = token
      ? await getProtectedContents(params, pagination)
      : await getContents(params, pagination);
    const json = await response.json();
    if (response.ok) {
      dispatch(setContentListMeta(json.metaData));
      if (pagination && pagination.page > 1) {
        dispatch(pushContentList(json.payload));
      } else {
        dispatch(setContentList(json.payload));
        dispatch(setRequiresAuthMap(json.payload));
      }
      dispatch(unsetSelectedContent());
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (err) {
  } finally {
    dispatch(unsetIsLoading());
  }
};

export const fetchContentDetail = id => async (dispatch, getState) => {
  try {
    const state = getState();
    const languageCode = getLanguageCode(state);
    const params = `?status=published&lang=${languageCode}`;
    dispatch(setIsLoading());
    dispatch(unsetSelectedContent());
    const response = await getContent(id, params);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedContent(json.payload));
      dispatch(clearNotification(id));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (err) {
  } finally {
    dispatch(unsetIsLoading());
  }
};

export const fetchProtectedContentDetail = id => async (dispatch, getState) => {
  try {
    const state = getState();
    const languageCode = getLanguageCode(state);
    const params = `?status=published&lang=${languageCode}`;
    dispatch(setIsLoading());
    dispatch(unsetSelectedContent());
    const response = await getProtectedContent(id, params);
    if (response.status !== 401) {
      const json = await response.json();
      if (response.ok) {
        dispatch(setSelectedContent(json.payload));
        dispatch(clearNotification(id));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
      }
    } else {
    }
  } catch (err) {
  } finally {
    dispatch(unsetIsLoading());
  }
};

export const fetchContentTypeMap = () => async dispatch => {
  const responseList = await Promise.all(
    contentTypeCodeList.map(getContentType),
  );
  const jsonList = await Promise.all(
    responseList.map(response => response.json()),
  );
  const contentTypeList = jsonList.map(json => json.payload);
  if (!responseList.map(res => res.ok).includes(false)) {
    const contentTypeMap = contentTypeList.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.code]: curr,
      }),
      {},
    );
    dispatch(setContentTypeMap(contentTypeMap));
  } else {
    dispatch(
      addErrors(
        contentTypeList
          .reduce((acc, curr) => acc.concat(curr.errors), [])
          .map(e => e.message),
      ),
    );
  }
};

const orderCategoryList = (categoryList, contentType) => {
  const order = categoryOrder[contentType];
  return categoryList.sort((a, b) => {
    return order.indexOf(a.code) - order.indexOf(b.code);
  });
};

export const fetchCategoryListAndFilters = () => async (dispatch, getState) => {
  const state = getState();
  const categoryRootCode = getCategoryRootCode(state);
  if (!categoryRootCode) {
    dispatch(setCategoryList([]));
    return;
  }
  const response = await getCategoryTree(categoryRootCode);
  const json = await response.json();
  if (response.ok) {
    const selectedContentType = getSelectedContentType(state);
    const categoryList = orderCategoryList(json.payload, selectedContentType);
    const categoryFilters = getCategoryFilters(state);
    dispatch(setCategoryList(categoryList));
    if (!categoryFilters || !Object.keys(categoryFilters).length) {
      dispatch(
        setCategoryFilter(
          json.payload.map(category => category.code),
          selectedContentType,
        ),
      );
    }
  } else {
    dispatch(addErrors(json.errors.map(e => e.message)));
  }
};

export const fetchNotifications = () => async dispatch => {
  const response = await getNotifications();
  if (response.status !== 401) {
    const json = await response.json();
    if (response.ok) {
      const notifications = json.payload.map(notification => {
        return notification && notification.body
          ? { ...notification, body: htmlSanitizer(notification.body) }
          : notification;
      });
      dispatch(setNotificationList(notifications));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } else {
    dispatch(setNotificationList([]));
  }
};

export const clearAllNotifications = () => async (dispatch, getState) => {
  const state = getState();
  const notificationIdList = getNotificationObjectIdList(state);
  const response = await postClearNotifications(notificationIdList);
  const json = await response.json();
  if (response.ok) {
    dispatch(setNotificationList([]));
  } else {
    dispatch(addErrors(json.errors.map(e => e.message)));
  }
};

export const clearNotification = id => async dispatch => {
  const response = await postClearNotifications([id]);
  if (response.status !== 401) {
    const json = await response.json();
    if (response.ok) {
      dispatch(removeNotification(id));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  }
};

export const clearToasts = () => (dispatch, getState) => {
  const state = getState();
  const toasts = getToasts(state);
  Object.keys(toasts).forEach(toastId => dispatch(removeToast(toastId)));
};

export const fetchUserProfile = username => async dispatch => {
  const response = await getUserProfile(username);
  const json = await response.json();
  if (response.ok) {
    dispatch(setUserProfile(json.payload));
  } else {
    dispatch(addErrors(json.errors.map(e => e.message)));
  }
};

export const login = data => async dispatch => {
  try {
    dispatch(clearErrors());
    dispatch(clearToasts());
    const response = await performLogin(data.username, data.pin);
    const json = await response.json();
    dispatch(loginUser(data.username, json.access_token));
    dispatch(fetchUserProfile(data.username));
  } catch (err) {
    const msg = get(err, 'message', err);
    dispatch(addErrors([msg]));
  }
};
