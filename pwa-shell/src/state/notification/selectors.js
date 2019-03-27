import { get } from 'lodash';

export const getNotificationList = state => get(state, 'notification.list', []);
