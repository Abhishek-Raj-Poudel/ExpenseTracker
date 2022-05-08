import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import officeReducer from "./Office/officeReducer";
import themeReducer from "./Theme/themeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  office: officeReducer,
  theme: themeReducer,
});

export default rootReducer;
