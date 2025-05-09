import React from "react";
import styled from "styled-components";
import RegisterCafes from "./RegisterCafes";
import TopStampCafes from "./TopStampCafes";
import CharContainer from "./ChartContainer";
import RightContainer from "./RightContainer";

const Container = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  height: 100vh;
`;
const Container1 = styled.div`
  flex: 2.5;
`;
const Container2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainCafe = () => {
  return (
    <Container>
      <Container1>
        <RegisterCafes />
      </Container1>
      <Container2>
        <RightContainer />
      </Container2>
    </Container>
  );
};

export default MainCafe;
