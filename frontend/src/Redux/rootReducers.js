import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import officeReducer from "./Office/officeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  office: officeReducer,
});

export default rootReducer;
