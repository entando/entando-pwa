import { SET_NOTIFICATION_LIST } from 'state/notification/types';

export const setNotificationList = payload => ({
  type: SET_NOTIFICATION_LIST,
  payload,
});
