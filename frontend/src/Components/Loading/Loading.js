import React from "react";
import styled from "styled-components";

const LoadingPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  aspect-ratio: 16 / 9;
`;

function Loading() {
  return (
    <LoadingPage>
      <h1>Loading...</h1>;
    </LoadingPage>
  );
}

export default Loading;
