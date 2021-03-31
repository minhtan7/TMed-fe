import * as types from "../constants/auth.constant";
import api from "../api";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

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
const logout = () => (dispatch) => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT_SUCCESS, payload: null });
  document.location.href = "/";
};

export const authActions = {
  register,
  login,
  logout,
};
