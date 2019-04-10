import { SET_NOTIFICATION_LIST, REMOVE_NOTIFICATION } from 'state/notification/types';

export const setNotificationList = payload => ({
  type: SET_NOTIFICATION_LIST,
  payload,
});

export const removeNotification = payload => ({
  type: REMOVE_NOTIFICATION,
  payload,
});
