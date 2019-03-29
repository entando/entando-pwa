import { SET_NOTIFICATION_LIST } from "state/notification/types";

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
    default:
      return state;
  }
};
