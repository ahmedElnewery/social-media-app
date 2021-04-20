import * as actionTypes from "./action-types";
export const initialState = {
  isLogin: (Boolean(localStorage.getItem("userInfo"))),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.login:
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload,
      };
    case actionTypes.logout:
      return { ...state, isLogin: false };
    default:
      return state
  }
};
