import React from "react";
import styled from "styled-components";
import QunatityManage from "./QuantityManage";
import NewUsers from "./NewUsers";
import AIMornitors from "./AIMornitors";
import NewCafes from "./NewCafes";
import TimeMornitors from "./TimeMornitors";

const Container = styled.div``;
const SecondLine = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;
const ThirdLine = styled.div`
  display: flex;
  gap: 20px;
`;
const MainDashboard = () => {
  return (
    <Container>
      <QunatityManage />
      <SecondLine>
        <NewCafes />
        <NewUsers />
        {/* <AIMornitors /> */}
      </SecondLine>
      <ThirdLine>
        <TimeMornitors />
      </ThirdLine>
    </Container>
  );
};

export default MainDashboard;
