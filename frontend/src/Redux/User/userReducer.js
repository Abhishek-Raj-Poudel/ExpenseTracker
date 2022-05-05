import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "./useType";

const initialState = {
  loading: false,
  name: "",
  email: "",
  password: "",
  re_password: "",
  gender: "",
  role: "Head",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        user_id: action.payload._id,
        user: action.payload.name,
        user_role: action.payload.role,
        error: "",
      };
    case FETCH_USERS_FAILURE:
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
