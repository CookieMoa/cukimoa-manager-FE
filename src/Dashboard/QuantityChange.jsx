import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 0 5px 0;
`;
const Number = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-left: -3px;
  color: ${(props) => (props.isPositive ? "#FF5B5B" : "#5B9FFF")};
`;
const ArrowIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-bottom: 2.5px;
`;

const QuantityChange = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <Wrapper>
      <ArrowIcon
        src={isPositive ? "/images/uparrow.svg" : "/images/downarrow.svg"}
      />
      <Number isPositive={isPositive}>{Math.abs(value)}</Number>
    </Wrapper>
  );
};

export default QuantityChange;
