import { ADD_MESSAGE_IDS, CLEAR_MESSAGE_IDS } from 'state/messageIds/types';

export const addMessageIds = messageIds => ({
  type: ADD_MESSAGE_IDS,
  payload: {
    messageIds,
  },
});

export const clearMessageIds = () => ({
  type: CLEAR_MESSAGE_IDS,
});
