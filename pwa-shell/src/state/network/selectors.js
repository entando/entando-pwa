import { createSelector } from 'reselect';
import { NETWORK_OFFLINE_STATUS, NETWORK_ONLINE_STATUS } from 'state/network/const';

export const getNetwork = state => state.network;

export const getStatus = createSelector(
  getNetwork,
  network => network.status,
);

export const isOffline = createSelector(
  getStatus,
  status => status === NETWORK_OFFLINE_STATUS,
);

export const isOnline = createSelector(
  getStatus,
  status => status === NETWORK_ONLINE_STATUS,
);
