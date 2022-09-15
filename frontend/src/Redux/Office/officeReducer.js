import {
  FETCH_OFFICE_REQUEST,
  FETCH_OFFICE_SUCCESS,
  FETCH_OFFICE_FALIURE,
} from "./officeType";

const initialState = {
  loading: false,
  id: "",
  name: "",
  roles: [],
  order_id: [],
  staff_id: [],
  client_id: [],
  other_orders: [],
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
        id: action.payload._id,
        name: action.payload.name,
        roles: action.payload.roles,
        staff_id: action.payload.staff_id,
        client_id: action.payload.client_id,
        order_id: action.payload.order_id,
        other_orders: action.payload.other_orders,
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
