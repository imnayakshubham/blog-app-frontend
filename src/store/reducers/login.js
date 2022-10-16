import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import {
  LoginActionTypes, SignupActionTypes, UpdateProfileActionTypes,
} from "../actions/login";

const defaultState = {
  loginStatus: AsyncStates.INITIAL,
  loginErrorMessage: "",
  loginResponse: {},
  signupStatus: AsyncStates.INITIAL,
  signupErrorMessage: "",
  signupResponse: {},
  updateProfileStatus: AsyncStates.INITIAL,
  updateProfileErrorMessage: "",
};

const loginReducer = handleActions(
  {
    [LoginActionTypes.REQUEST]: (state) => ({
      ...state,
      loginStatus: AsyncStates.LOADING,
      loginErrorMessage: "",
    }),
    [LoginActionTypes.SUCCESS]: (state, action) => {
      return {
        ...state,
        loginStatus: AsyncStates.SUCCESS,
        loginErrorMessage: "",
        loginResponse: action.payload.loginResponse,
      };
    },
    [LoginActionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        loginStatus: AsyncStates.ERROR,
        loginErrorMessage: action.payload.error,
      }
    },
    [SignupActionTypes.REQUEST]: (state) => ({
      ...state,
      signupStatus: AsyncStates.LOADING,
      signupErrorMessage: "",
    }),
    [SignupActionTypes.SUCCESS]: (state, action) => {
      return {
        ...state,
        signupStatus: AsyncStates.SUCCESS,
        signupErrorMessage: "",
        signupResponse: action.payload,
      };
    },
    [SignupActionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        signupStatus: AsyncStates.ERROR,
        signupErrorMessage: action.payload.error,
      }
    },
    [UpdateProfileActionTypes.REQUEST]: (state) => ({
      ...state,
      updateProfileStatus: AsyncStates.LOADING,
      updateProfileErrorMessage: "",
    }),
    [UpdateProfileActionTypes.SUCCESS]: (state, action) => {
      return {
        ...state,
        updateProfileStatus: AsyncStates.SUCCESS,
        updateProfileErrorMessage: "",
        loginResponse: action.payload.loginResponse,
      };
    },
    [UpdateProfileActionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        updateProfileStatus: AsyncStates.ERROR,
        updateProfileErrorMessage: action.payload.error,
      }
    },
  },
  defaultState
);

export default loginReducer;
