import * as types from "../constants/auth.constant";

const isAuthenticated = !!localStorage.getItem("accessToken");
const role = localStorage.getItem("role");
const initialState = {
  isAuthenticated,
  userInfo: null,
  role,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_REQUEST:
    case types.REGISTER_SUCCESS:
      return { ...state, userInfo: payload };
    case types.REGISTER_FAILURE:
    case types.LOGIN_REQUEST:

    case types.LOGIN_SUCCESS:
      return { ...state, userInfo: payload };
    case types.LOGIN_FAILURE:
    case types.LOGOUT_REQUEST:

    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
    default:
      return state;
  }
};

export default authReducer;
