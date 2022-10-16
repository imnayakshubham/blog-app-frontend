import { createActions } from "redux-actions";

export const LoginActionTypes = {
  REQUEST: "LOGIN_REQUEST",
  SUCCESS: "LOGIN_SUCCESS",
  FAILURE: "LOGIN_FAILURE",
}

export const SignupActionTypes = {
  REQUEST: "SIGNUP_REQUEST",
  SUCCESS: "SIGNUP_SUCCESS",
  FAILURE: "SIGNUP_FAILURE",
}

export const UpdateProfileActionTypes = {
  REQUEST: "UPDATE_PROFILE_REQUEST",
  SUCCESS: "UPDATE_PROFILE_SUCCESS",
  FAILURE: "UPDATE_PROFILE_FAILURE",
}

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = createActions({
  [LoginActionTypes.REQUEST]: (payload) => payload,
  [LoginActionTypes.SUCCESS]: (loginResponse) => ({ loginResponse }),
  [LoginActionTypes.FAILURE]: (error) => ({ error }),
  [SignupActionTypes.REQUEST]: (payload) => payload,
  [SignupActionTypes.SUCCESS]: (loginResponse) => ({ loginResponse }),
  [SignupActionTypes.FAILURE]: (error) => ({ error }),
  [UpdateProfileActionTypes.REQUEST]: (payload) => payload,
  [UpdateProfileActionTypes.SUCCESS]: (loginResponse) => ({ loginResponse }),
  [UpdateProfileActionTypes.FAILURE]: (error) => ({ error }),
});
