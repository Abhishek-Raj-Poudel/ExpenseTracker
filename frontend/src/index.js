import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import { DataLayer } from "./Datalayer";
import reducer, { initialState } from "./reducer";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);
root.render(
  <>
    {/* <DataLayer initialState={initialState} reducer={reducer}> */}
    <App></App>
    {/* </DataLayer> */}
  </>
);
