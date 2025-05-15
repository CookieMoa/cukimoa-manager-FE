import styled from "styled-components";
import React from "react";

const QuantitiyConatier = styled.div`
  background: #ffffff;
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
        <Count>
          {/* {title === "이전 모델 대비 성능 향상률" ? `${count} %` : count} */}
          {count}
        </Count>
      </NumWrapper>
    </QuantitiyConatier>
  );
};

export default Quantity;
