import React from "react";
import styled from "styled-components";

import CharContainer from "./ChartContainer";
import TopStampCafes from "./TopStampCafes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const Top = styled.div`
  flex: 1;
`;

const Bottom = styled.div`
  flex: 1;
`;

const RightContainer = () => {
  return (
    <Container>
      <Top>
        <TopStampCafes />
      </Top>
      {/* <Bottom>
        <CharContainer />
      </Bottom> */}
    </Container>
  );
};

export default RightContainer;
