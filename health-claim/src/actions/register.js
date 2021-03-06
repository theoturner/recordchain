import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";

export const REGISTER_BEGIN = "REGISTER_BEGIN";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const registerBegin = () => ({ type: REGISTER_BEGIN });

export const registerError = error => ({
  type: REGISTER_ERROR,
  payload: { error }
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

function register(username, password, did, isPatient) {
  return dispatch => {
    dispatch(registerBegin());
    const url = isPatient
      ? `${apiEndpoint}/create_patient_req?username=${username}&password=${password}&issuer_did=${did}`
      : `${apiEndpoint}/create_doctor_req?username=${username}&password=${password}`;

    return fetch(url)
      .then(raw => handleErrors(raw))
      .then(response => dispatch(registerSuccess()))
      .catch(error => dispatch(registerError(error)));
  };
}

export default register;
