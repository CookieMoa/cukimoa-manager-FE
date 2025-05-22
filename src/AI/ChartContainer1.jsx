import React from "react";
import styled from "styled-components";
import BarChart1 from "./BarChart1";

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

const CharContainer1 = () => {
  return (
    <Container>
      <Header>
        <Title>키워드 별 리뷰 개수</Title>
      </Header>
      <BarChart1 />
    </Container>
  );
};
export default CharContainer1;
