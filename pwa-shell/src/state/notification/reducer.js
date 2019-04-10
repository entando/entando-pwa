import { SET_NOTIFICATION_LIST, REMOVE_NOTIFICATION } from "state/notification/types";

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        list: state.list.filter(notification => notification.id !== action.payload)
      }
    default:
      return state;
  }
};
