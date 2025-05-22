import React from "react";
import styled from "styled-components";
import BarChart2 from "./BarChart2";

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  height: 530px; // 화면 높이의 50%로 설정
  overflow-y: auto; // 내용이 넘칠 경우 세로 스크롤을 추가
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
`;

const Title = styled.div`
  font-size: 16px;
  color: #bcbcbc;
  font-weight: bold;
`;

const CharContainer2 = () => {
  return (
    <Container>
      <Header>
        <Title>키워드 별 성능</Title>
      </Header>
      <BarChart2 />
    </Container>
  );
};
export default CharContainer2;
