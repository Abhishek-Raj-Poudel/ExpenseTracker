import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas:
    "sidebar navbar"
    " sidebar main  ";
  grid-template-columns: 250px 1fr;
  grid-template-rows: min-content 1fr;
`;

export default function UserLayout() {
  return (
    <Grid>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div>
        <Outlet></Outlet>
      </div>
    </Grid>
  );
}
