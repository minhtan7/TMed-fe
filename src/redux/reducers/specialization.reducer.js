import * as types from "../constants/specialization.costant";
const initialState = {
  specializations: [],
  loading: false,
};

const specializationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_SPECIALIZATION_REQUEST:
      return { ...state, loading: true };
    case types.GET_ALL_SPECIALIZATION_SUCCESS:
      return {
        ...state,
        specializations: payload.specializations,
        loading: false,
      };
    case types.GET_ALL_SPECIALIZATION_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default specializationReducer;
