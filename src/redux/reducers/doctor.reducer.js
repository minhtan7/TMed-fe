import * as types from "../constants/doctor.constants";
const initialState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  totalPages: 1,
  appointment: {},
  sevenDaysAppointments: {},
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
        currentDoctor: { ...payload.doctor },
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
        totalPages: payload.totalPages,
        loading: false,
      };
    case types.GET_DOCTOR_ME_FAILURE:
      return { ...state, loading: false };

    case types.PUT_DOCTOR_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.PUT_DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        currentDoctor: payload.doctor,
        loading: false,
      };
    case types.PUT_DOCTOR_PROFILE_FAILURE:
      return { ...state, loading: false };

    case types.POST_ACCEPTED_APPOINTMENT_REQUEST:
      return { ...state, loading: true };
    case types.POST_ACCEPTED_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointment: payload.appointment,
        loading: false,
      };
    case types.POST_ACCEPTED_APPOINTMENT_FAILURE:
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

    case types.GET_APPOINTMENT_OF_A_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case types.GET_APPOINTMENT_OF_A_DOCTOR_SUCCESS:
      return {
        ...state,
        sevenDaysAppointments: payload.sevenDaysAppointments,
        loading: false,
      };
    case types.GET_APPOINTMENT_OF_A_DOCTOR_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default doctorReducer;
