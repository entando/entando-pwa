import { get } from 'lodash';

export const getNotificationList = state => get(state, 'notification.list', []);

export const getNotificationAmount = state => get(state, 'notification.list.length', 0);
