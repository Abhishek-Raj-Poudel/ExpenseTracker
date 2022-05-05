import { HttpClient } from "../../utils/httpClients";

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  POST_USERS_REQUEST,
  POST_USERS_SUCCESS,
  POST_USERS_FALIURE,
} from "./UserTypes";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fetchUserSuccess = (responseData) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: responseData,
  };
};
export const fetchUserFaliure = (errorMsg) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: errorMsg,
  };
};
export const postUserRequest = () => {
  return {
    type: POST_USERS_REQUEST,
  };
};
export const postUserSuccess = (responseData) => {
  return {
    type: POST_USERS_SUCCESS,
    payload: responseData,
  };
};
export const postUserFaliure = (errorMsg) => {
  return {
    type: POST_USERS_FAILURE,
    payload: errorMsg,
  };
};

// fetch user should be in the login component
