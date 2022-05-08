import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./useType";

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
