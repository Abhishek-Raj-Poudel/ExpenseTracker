import {
  FETCH_OFFICE_REQUEST,
  FETCH_OFFICE_SUCCESS,
  FETCH_OFFICE_FALIURE,
} from "./officeType";
export const fetchOfficeRequest = () => {
  return {
    type: FETCH_OFFICE_REQUEST,
  };
};
export const fetchOfficeSuccess = (responseData) => {
  return {
    type: FETCH_OFFICE_SUCCESS,
    payload: responseData,
  };
};
export const fetchOfficeFaliure = (errorMsg) => {
  return {
    type: FETCH_OFFICE_FALIURE,
    payload: errorMsg,
  };
};
