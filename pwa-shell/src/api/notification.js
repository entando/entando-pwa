import { makeMockRequest, METHODS } from '@entando/apimanager';
import { GET_NOTIFICATIONS_RESPONSE_OK } from '__tests__/mocks/notification';

const defaultPageObject = { page: 1, pageSize: 10 };

export const getNotifications = (page = defaultPageObject) => (
  makeMockRequest(
    {  
      uri: '/api/pwa/notifications',
      method: METHODS.GET,
      mockResponse: GET_NOTIFICATIONS_RESPONSE_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postClearNotifications = (user, notifications) => (
  makeMockRequest({
    uri: `/api/TODO`,
    body: {
      notifications,
      user,
    },
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
  })
);
