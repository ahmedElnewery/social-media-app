import * as actionTypes from "./action-types";
export const initialState = {
  isLogin: (Boolean(localStorage.getItem("userInfo"))),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
  
isSearchOpen:false

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
    return {...state,isSearchOpen:true}
    case actionTypes.CLOSE_SEARCH:
      return {...state,
        isSearchOpen:false}
    default:
      return state
  }
};
