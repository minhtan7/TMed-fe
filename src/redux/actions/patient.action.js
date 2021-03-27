import * as types from "../constants/patient.constant";
import api from "../api";

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

export const patientActions = {
  getPatientMe,
};
