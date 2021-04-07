import * as types from "../constants/doctor.constants";
import api from "../api";
import { toast } from "react-toastify";
const moment = require("moment");

const getList = ({
  pageNum,
  limit,
  query,
  ownerId,
  districtQuery,
  specializationsQuery,
  sortByQuery,
}) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_DOCTOR_REQUEST });
  console.log(pageNum, limit, sortByQuery, districtQuery, specializationsQuery);
  try {
    let queryString = "";
    if (query) {
      /* queryString = `&title[$regex]=${query}&titile[options]=i`; */
      queryString = `&search=${query}`;
    }
    if (!limit) {
      limit = 5;
    }
    if (!pageNum) {
      pageNum = 1;
    }
    let districtString = `&district=${districtQuery}`;
    let specializationsString = `&specializations=${specializationsQuery}`;
    let sortByString = `&sortBy=${sortByQuery}`;
    const res = await api.get(
      `/doctor?page=${pageNum}&limit=${limit}${queryString}${districtString}${specializationsString}${sortByString}`
    );
    console.log(res.data.data);
    dispatch({ type: types.GET_ALL_DOCTOR_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_ALL_DOCTOR_FAILURE, payload: err });
  }
};

const getSingleDoctor = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOCTOR_REQUEST });
    const res = await api.get(`/doctor/${id}`);
    /* const res = await fetch("http://localhost:5000/api/doctor/" + id);
    const data = await res.json();
    console.log("res", data); */
    dispatch({
      type: types.GET_SINGLE_DOCTOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_DOCTOR_FAILURE, payload: err });
  }
};

const getDoctorMe = ({ pageNum, limit, query }) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_ME_REQUEST });
    let queryString;
    if (!limit) {
      limit = 5;
    }
    if (!pageNum) {
      pageNum = 1;
    }
    if (query) {
      queryString = `&search=${query}`;
    }

    const res = await api.get(
      `/doctor/me?page=${pageNum}&limit=${limit}${queryString}`
    );
    dispatch({
      type: types.GET_DOCTOR_ME_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_DOCTOR_ME_FAILURE, payload: err });
  }
};

const getAppointmentOfaDoc = (date, doctorId) => async (dispatch) => {
  try {
    date = moment(date).format("YYYY-MM-DD");

    dispatch({ type: types.GET_APPOINTMENT_OF_A_DOCTOR_REQUEST });
    const res = await api.get(`/appointment/${date}/doctor/${doctorId}`);
    dispatch({
      type: types.GET_APPOINTMENT_OF_A_DOCTOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_APPOINTMENT_OF_A_DOCTOR_FAILURE, payload: err });
  }
};

const acceptedAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_ACCEPTED_APPOINTMENT_REQUEST });
    const res = await api.put(`/appointment/${id}/accepted`);
    dispatch({
      type: types.POST_ACCEPTED_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Appoinment accepted!");
    let query;
    dispatch(doctorActions.getDoctorMe({ pageNum: 1, limit: 10, query }));
  } catch (err) {
    dispatch({ type: types.POST_ACCEPTED_APPOINTMENT_FAILURE, payload: err });
  }
};

const cancelAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PUT_CANCEL_REQUEST });
    let date = moment().format();
    const res = await api.put(`/appointment/${id}/cancel`, { date });
    dispatch({
      type: types.PUT_CANCEL_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Appoinment canceled!");
    let pageNum, limit, query;
    dispatch(doctorActions.getDoctorMe({ pageNum, limit: 10, query }));
  } catch (err) {
    dispatch({ type: types.PUT_CANCEL_FAILURE, payload: err });
  }
};

const putDoctorProfile = (profile) => async (dispatch) => {
  try {
    console.log(profile);
    dispatch({ type: types.PUT_DOCTOR_PROFILE_REQUEST });
    const res = await api.put(`/doctor/me`, profile);
    dispatch({
      type: types.PUT_DOCTOR_PROFILE_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Profile updated!");
    dispatch(doctorActions.getDoctorMe());
  } catch (err) {
    dispatch({ type: types.PUT_DOCTOR_PROFILE_FAILURE, payload: err });
  }
};

export const doctorActions = {
  getList,
  getSingleDoctor,
  getDoctorMe,
  acceptedAppointment,
  putDoctorProfile,
  cancelAppointment,
  getAppointmentOfaDoc,
};
