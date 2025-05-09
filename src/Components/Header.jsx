import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 65px;
  background-color: #fff;
  align-items: center;
  display: flex;
`;
const Title = styled.div`
  font-size: 18px;
  color: #828282;
  font-weight: bold;
  padding-left: 27px;
`;

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "대시보드";
      case "/cafe":
        return "카페 관리";
      case "/users":
        return "유저 관리";
      default:
        return ""; // 혹은 "페이지 없음"
    }
  };
  return (
    <Container>
      <Title>{getTitle()}</Title>
    </Container>
  );
};

export default Header;
