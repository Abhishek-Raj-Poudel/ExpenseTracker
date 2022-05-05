import {
  FETCH_OFFICE_REQUEST,
  FETCH_OFFICE_SUCCESS,
  FETCH_OFFICE_FALIURE,
} from "./officeType";

const initialState = {
  loading: false,
  office: "",
  office_id: "",
  user_id: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
        office: action.payload.name,
        user_id: action.payload.user_id,
      };
    case FETCH_OFFICE_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
