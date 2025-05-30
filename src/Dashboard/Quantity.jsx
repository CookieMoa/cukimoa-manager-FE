import styled from "styled-components";
import React from "react";
import QuantityChange from "./QuantityChange";

const QuantitiyConatier = styled.div`
  background: #ffffff;
  /* width: 220px; */
  flex: 1;
  border-radius: 18px;
  border: 1px solid #eeeeee;
  padding: 14px;
  /* flex-shrink: 0; // 이게 컴포넌트 크기를 일정유지시켜줌 */
`;
const Title = styled.div`
  color: #bcbcbc;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Count = styled.div`
  color: #000000;
  font-size: 35px;
  font-weight: bold;
`;

const NumWrapper = styled.div`
  display: flex;
`;
const Quantity = ({ title, count, number }) => {
  return (
    <QuantitiyConatier>
      <Title>{title}</Title>
      <NumWrapper>
        <Count>{title === "쿠폰 사용율" ? `${count} %` : count}</Count>
        {/* <QuantityChange value={number} /> */}
      </NumWrapper>
    </QuantitiyConatier>
  );
};

export default Quantity;
