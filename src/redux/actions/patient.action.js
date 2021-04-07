import * as types from "../constants/patient.constant";
import api from "../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { doctorActions } from "./doctor.action";
const moment = require("moment");

const getPatientMe = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_PATIENT_REQUEST });
    const res = await api.get(`/patient/me`);
    dispatch({
      type: types.GET_SINGLE_PATIENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_PATIENT_FAILURE, payload: err });
  }
};

const putPatientProfile = (profile) => async (dispatch) => {
  try {
    dispatch({ type: types.PUT_PATIENT_PROFILE_REQUEST });
    console.log("profile", profile);
    const res = await api.put(`/patient/me`, profile);
    dispatch({
      type: types.PUT_PATIENT_PROFILE_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Profile updated!");
    dispatch(patientActions.getPatientMe());
  } catch (err) {
    dispatch({ type: types.PUT_PATIENT_PROFILE_FAILURE, payload: err });
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
    dispatch(patientActions.getPatientMe());
  } catch (err) {
    dispatch({ type: types.PUT_CANCEL_FAILURE, payload: err });
  }
};

const requestAppointmentIsPaidFalse = (doctorId, date, slot, role) => async (
  dispatch
) => {
  try {
    let value = new Date();
    dispatch({ type: types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_REQUEST });
    const res = await api.post(`/appointment/doctor/${doctorId}`, {
      date,
      slot,
      role,
    });
    dispatch(doctorActions.getAppointmentOfaDoc(value, doctorId));

    dispatch({
      type: types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_SUCCESS,
      payload: res.data.data,
    });

    /* dispatch(patientActions.getPatientMe()); */
  } catch (err) {
    dispatch({
      type: types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_FAILURE,
      payload: err,
    });
  }
};

const requestAppointment = (status, appointmentId) => async (dispatch) => {
  try {
    dispatch({ type: types.PUT_RESERVATION_FEE_REQUEST });
    if (status === "COMPLETED") {
      const res = await api.put(`/appointment`, { status, appointmentId });

      dispatch({
        type: types.PUT_RESERVATION_FEE_SUCCESS,
        payload: res.data.data,
      });
      toast.success("Appoinment request created!");
      document.location.href = "/patient/me";
    } else toast.fail(status);

    /* dispatch(patientActions.getPatientMe()); */
  } catch (err) {
    dispatch({ type: types.PUT_RESERVATION_FEE_FAILURE, payload: err });
  }
};

const addReivew = (contentReview, star, doctorId) => async (dispatch) => {
  try {
    let { title, body } = contentReview;
    dispatch({ type: types.POST_ADD_REVIEW_REQUEST });
    const res = await api.post(`/review`, { title, body, star, doctorId });
    dispatch({
      type: types.POST_ADD_REVIEW_SUCCESS,
      payload: res.data.data,
    });
    dispatch(doctorActions.getSingleDoctor(doctorId));
  } catch (err) {
    dispatch({
      type: types.POST_ADD_REVIEW_FAILURE,
      payload: err,
    });
  }
};
const getSingleAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_APPOINTMENT_REQUEST });
    const res = await api.get(`/appointment/${id}`);
    dispatch({
      type: types.GET_SINGLE_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
    /* dispatch(doctorActions.getSingleDoctor(doctorId)); */
  } catch (err) {
    dispatch({
      type: types.GET_SINGLE_APPOINTMENT_FAILURE,
      payload: err,
    });
  }
};

export const patientActions = {
  getPatientMe,
  putPatientProfile,
  cancelAppointment,
  requestAppointmentIsPaidFalse,
  requestAppointment,
  addReivew,
  getSingleAppointment,
};
