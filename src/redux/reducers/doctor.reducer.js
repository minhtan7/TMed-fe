import * as types from "../constants/doctor.constants";
const initialState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  totalPages: 1,
};

const doctorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case types.GET_ALL_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: payload.doctors,
        totalPages: payload.totalPages,
        loading: false,
      };
    case types.GET_ALL_DOCTOR_FAILURE:
      return { ...state, loading: false };
    case types.GET_SINGLE_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_DOCTOR_SUCCESS:
      return {
        ...state,
        currentDoctor: payload.doctor,
        loading: false,
      };
    case types.GET_SINGLE_DOCTOR_FAILURE:
      return { ...state, loading: false };
    case types.GET_DOCTOR_ME_REQUEST:
      return { ...state, loading: true };
    case types.GET_DOCTOR_ME_SUCCESS:
      return {
        ...state,
        currentDoctor: payload.doctor,
        loading: false,
      };
    case types.GET_DOCTOR_ME_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default doctorReducer;
