import * as types from "../constants/specialization.costant";
import api from "../api";

const getAllSpecialization = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_SPECIALIZATION_REQUEST });
  try {
    const res = await api.get(`/specialization`);
    dispatch({
      type: types.GET_ALL_SPECIALIZATION_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_ALL_SPECIALIZATION_FAILURE, payload: err });
  }
};

export const specializationActions = {
  getAllSpecialization,
};
