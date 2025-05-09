import React from "react";
import styled from "styled-components";

import TopStampUsers from "./TopStampUsers";
import BadReviews from "./BadReviews";
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
        <TopStampUsers />
      </Top>
      <Bottom>
        <BadReviews />
      </Bottom>
    </Container>
  );
};

export default RightContainer;
