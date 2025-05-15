import React from "react";
import styled from "styled-components";

import CharContainer from "./ChartContainer";
import TopStampCafes from "./TopStampCafes";
import TopUsedStampCafes from "./TopUsedStampCafes";

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
      <Bottom>
        {/* <CharContainer /> */}
        <TopUsedStampCafes />
      </Bottom>
    </Container>
  );
};

export default RightContainer;
