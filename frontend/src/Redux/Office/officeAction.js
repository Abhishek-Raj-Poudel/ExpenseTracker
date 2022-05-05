import {
  FETCH_OFFICE_REQUEST,
  FETCH_OFFICE_SUCCESS,
  FETCH_OFFICE_FALIURE,
} from "./officeType";
export const fetchUoserRequest = () => {
  return {
    type: FETCH_OFFICE_REQUEST,
  };
};
export const fetchUserSuccess = (responseData) => {
  return {
    type: FETCH_OFFICE_SUCCESS,
    payload: responseData,
  };
};
export const fetchUserFaliure = (errorMsg) => {
  return {
    type: FETCH_OFFICE_FALIURE,
    payload: errorMsg,
  };
};
export const postUserFaliure = (errorMsg) => {
  return {
    type: FETCH_OFFICE_FALIURE,
    payload: errorMsg,
  };
};
export const postUoserRequest = () => {
  return {
    type: FETCH_OFFICE_REQUEST,
  };
};
export const postUserSuccess = (responseData) => {
  return {
    type: FETCH_OFFICE_SUCCESS,
    payload: responseData,
  };
};
