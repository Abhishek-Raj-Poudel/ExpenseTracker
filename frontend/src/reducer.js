export const initialState = {
  user: "",
  office: "",
  product_id: [],
  user_id: [],
  service: "",
};

const reducer = (state, action) => {
  console.log(action);
  //   Acton -> type,[payload]
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
