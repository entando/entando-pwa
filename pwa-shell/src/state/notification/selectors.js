import { get } from 'lodash';
import { createSelector } from 'reselect';

export const getNotification = state => state.notification;

export const getNotificationList = createSelector(
  getNotification,
  notification => get(notification, 'list', [])
);

export const getNotificationObjectIdList = createSelector(
  getNotificationList,
  notificationList => notificationList.map(item => item.objectId)
);

export const getNotificationAmount = createSelector(
  getNotificationList,
  notificationList => notificationList.length
);
