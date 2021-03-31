import * as types from "../constants/patient.constant";
const initialState = {
  patients: [],
  currentPatient: null,
  loading: false,
  totalPages: 1,
  appointment: {},
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

    case types.PUT_PATIENT_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.PUT_PATIENT_PROFILE_SUCCESS:
      return {
        ...state,
        currentPatient: payload.doctor,
        loading: false,
      };
    case types.PUT_PATIENT_PROFILE_FAILURE:
      return { ...state, loading: false };

    case types.PUT_CANCEL_REQUEST:
      return { ...state, loading: true };
    case types.PUT_CANCEL_SUCCESS:
      return {
        ...state,
        appointment: payload.appointment,
        loading: false,
      };
    case types.PUT_CANCEL_FAILURE:
      return { ...state, loading: false };

    case types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_REQUEST:
      return { ...state, loading: true };
    case types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_SUCCESS:
      return {
        ...state,
        appointment: payload.appointment,
        loading: false,
      };
    case types.POST_REQUEST_APPOINTMENT_IS_PAID_FALSE_FAILURE:
      return { ...state, loading: false };

    case types.PUT_RESERVATION_FEE_REQUEST:
      return { ...state, loading: true };
    case types.PUT_RESERVATION_FEE_SUCCESS:
      return {
        ...state,
        appointment: payload.appointment,
        loading: false,
      };
    case types.PUT_RESERVATION_FEE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default patientReducer;
