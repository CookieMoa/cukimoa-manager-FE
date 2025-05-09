import React from "react";
import styled from "styled-components";
import BarChart from "./BarChart";

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  height: 45vh; // 화면 높이의 50%로 설정
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

const CharContainer = () => {
  return (
    <Container>
      <Header>
        <Title>구별 등록 카페 수</Title>
      </Header>
      <BarChart />
    </Container>
  );
};
export default CharContainer;
