import * as types from "../constants/doctor.constants";
import api from "../api";

const getList = ({
  pageNum,
  limit,
  query,
  ownerId,
  sortBy = { key: "createdAt", ascending: -1 },
}) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_DOCTOR_REQUEST });
  console.log(pageNum, limit, query);
  try {
    let queryString = "";
    if (query) {
      /* queryString = `&title[$regex]=${query}&titile[options]=i`; */
      queryString = `&search=${query}`;
    }
    if (ownerId) {
      queryString = `${queryString}&author=${ownerId}`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    if (!limit) {
      limit = 5;
    }
    if (!pageNum) {
      pageNum = 1;
    }
    const res = await api.get(
      `/doctor?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
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
    dispatch({
      type: types.GET_SINGLE_DOCTOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_DOCTOR_FAILURE, payload: err });
  }
};

const getDoctorMe = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_ME_REQUEST });
    const res = await api.get(`/doctor/me`);
    dispatch({
      type: types.GET_DOCTOR_ME_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_DOCTOR_ME_FAILURE, payload: err });
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
  } catch (err) {
    dispatch({ type: types.POST_ACCEPTED_APPOINTMENT_FAILURE, payload: err });
  }
};

export const doctorActions = {
  getList,
  getSingleDoctor,
  getDoctorMe,
  acceptedAppointment,
};
