import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import doctorReducer from "./doctor.reducer";
import patientReducer from "./patient.reducer";

export default combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  patient: patientReducer,
});
