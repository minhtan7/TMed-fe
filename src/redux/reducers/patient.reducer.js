import * as types from "../constants/patient.constant";
const initialState = {
  patients: [],
  currentPatient: null,
  loading: false,
  totalPages: 1,
};

const patientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SINGLE_PATIENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_PATIENT_SUCCESS:
      return {
        ...state,
        currentPatient: payload.patient,
        loading: false,
      };
    case types.GET_SINGLE_PATIENT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default patientReducer;
