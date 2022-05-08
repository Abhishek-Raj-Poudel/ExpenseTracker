import { configureStore } from "@reduxjs/toolkit";
// these two will help make your state persistant
import { persistStore, persistReducer } from "redux-persist";
//Storage basically go to your localstorage.
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducers";

import logger from "redux-logger";

import thunk from "redux-thunk";

//naming the storage key value and asigning 'storage' as
//value
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

let persistor = persistStore(store);

export { store, persistor };
