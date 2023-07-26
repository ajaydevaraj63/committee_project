import { AUTH, LOGOUT, FORGOT, RESET } from "../constants/actionTypes.js";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:

      localStorage.setItem("Profile", JSON.stringify(action.LocalData));
      localStorage.setItem("loggedInUser", action.LocalData.UserName)

      return { ...state, authData: action?.LocalData };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case FORGOT:
      return state;
    case RESET:
      return state;
    default:
      return state;
  }
};
export default authReducer;
