import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";

//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loadings={null} persistor={persistor}>
      <App></App>
    </PersistGate>
  </Provider>
);
