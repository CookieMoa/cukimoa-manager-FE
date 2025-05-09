import React from "react";
import styled from "styled-components";
import RegisterUsers from "./RegisterUsers";
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

const MainUser = () => {
  return (
    <Container>
      <Container1>
        <RegisterUsers />
      </Container1>
      <Container2>
        <RightContainer />
      </Container2>
    </Container>
  );
};

export default MainUser;
