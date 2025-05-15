import React from "react";
import styled from "styled-components";
import QunatityManage from "./QuantityManage";
import CharContainer1 from "./ChartContainer1";
import CharContainer2 from "./ChartContainer2";
const Container = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const Container1 = styled.div`
  display: flex;
  gap: 14px;
  /* width: 100%;
  height: 100vh; */
`;


const MainAI = () => {
  return (
    <Container>
      <QunatityManage />
      <Container1>
        <CharContainer1 />
        <CharContainer2 />
      </Container1>
    </Container>
  );
};

export default MainAI;
