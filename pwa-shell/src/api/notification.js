import { makeRequest, METHODS } from '@entando/apimanager';
import { GET_NOTIFICATIONS_RESPONSE_OK } from 'mocks/notification';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getNotifications = (page = defaultPageObject) =>
  makeRequest(
    {
      uri: '/api/pwa/notifications',
      method: METHODS.GET,
      mockResponse: GET_NOTIFICATIONS_RESPONSE_OK,
      useAuthentication: true,
    },
    page,
  );

export const postClearNotifications = notificationIds =>
  makeRequest({
    uri: `/api/pwa/notifications/contents/markAsRead`,
    body: {
      objectIds: notificationIds,
    },
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
  });
