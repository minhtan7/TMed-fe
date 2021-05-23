import * as types from "../constants/auth.constant";
import api from "../api";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { Next } from "react-bootstrap/esm/PageItem";

const register = (profile) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  try {
    console.log(profile);
    const res = await api.post("/auth/register", profile);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success("Register Successfully");
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: err });
  }
};

const login = (profile) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const res = await api.post("/auth/login", profile);
    if (res.data.data.doctor) {
      localStorage.setItem("role", "doctor");
    } else if (res.data.data.patient) {
      localStorage.setItem("role", "patient");
    }
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    toast.success("Login Successfully");
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err });
  }
};

const loginWithProvider = (user, authProvider) => async (dispatch) => {
  dispatch({ type: types.LOGIN_WITH_PROVIDER_REQUEST });
  try {
    console.log(user, authProvider);
    const res = await api.post(`auth/login/${authProvider}`, user);
    localStorage.setItem("role", "patient");
    dispatch({
      type: types.LOGIN_WITH_PROVIDER_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Login Successfully");
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_PROVIDER_FAILURE });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  dispatch({ type: types.LOGOUT_SUCCESS, payload: null });
};

const verifyEmail = (code) => async (dispatch) => {
  dispatch({ type: types.VERIFY_EMAIL_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/verify", { code });
    dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: res.user });
  } catch (error) {
    dispatch({ type: types.VERIFY_EMAIL_FAILURE, payload: error });
  }
};

export const authActions = {
  register,
  login,
  logout,
  verifyEmail,
  loginWithProvider,
};
