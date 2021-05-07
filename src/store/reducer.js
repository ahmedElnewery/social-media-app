import * as actionTypes from "./action-types";
export const initialState = {
  isLogin: Boolean(localStorage.getItem("userInfo")),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),

  isSearchOpen: false,
  isChatOpen: false,
  unreadMessages:0
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload,
      };
    case actionTypes.LOGOUT:
      return { ...state, isLogin: false };
    case actionTypes.OPEN_SEARCH:
      return { ...state, isSearchOpen: true };
    case actionTypes.CLOSE_SEARCH:
      return { ...state, isSearchOpen: false };
    case actionTypes.TOGGLE_CHAT:
      return { ...state, isChatOpen: !state.isChatOpen };
      case actionTypes.OPEN_CHAT:
      return { ...state, isChatOpen: true };
    case actionTypes.CLOSE_CHAT:
      return { ...state, isChatOpen: false };
      case actionTypes.INCREMENT_UNREAD_MESSAGES:
        return { ...state, unreadMessages:state.unreadMessages+1 };
        case actionTypes.RESET_UNREAD_MESSAGES:
          return { ...state, unreadMessages: 0 };
    default:
      return state;
  }
};
