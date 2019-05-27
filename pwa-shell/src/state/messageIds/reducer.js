import { ADD_MESSAGE_IDS, CLEAR_MESSAGE_IDS } from 'state/messageIds/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE_IDS: {
      return action.payload.messageIds;
    }
    case CLEAR_MESSAGE_IDS: {
      return [];
    }
    default: return state;
  }
};

export default reducer;
