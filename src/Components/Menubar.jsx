import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 150px;
  height: 100vh;
  background-color: #555555;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 5px;
`;
const CukimoaLogo = styled.img`
  width: 105px;
  margin: 20px;
  margin-bottom: 50px;
`;
const StyledLink = styled(NavLink)`
  width: 130px;
  height: 35px;
  margin-bottom: 15px;
  text-decoration: none;
  border-radius: 10px;

  // 여기서 hover 효과 주기!
  &:hover {
    background-color: #6c6c6c;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
`;
const LogoImgs = styled.img`
  width: 14px;
  height: 14px;
`;
const MenuTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-left: 9px;
  display: flex;
  justify-content: center;
`;

const Menubar = () => {
  return (
    <Container>
      <CukimoaLogo src="/images/menulogo.svg" />
      <StyledLink to="/">
        <MenuItem>
          <LogoImgs src="/images/dashboardlogo.svg" />
          <MenuTitle>대시보드</MenuTitle>
        </MenuItem>
      </StyledLink>
      <StyledLink to="/cafe">
        <MenuItem>
          <LogoImgs src="/images/cafelogo.svg" />
          <MenuTitle>카페 관리</MenuTitle>
        </MenuItem>
      </StyledLink>
      <StyledLink to="/users">
        <MenuItem>
          <LogoImgs src="/images/userlogo.svg" />
          <MenuTitle>유저 관리</MenuTitle>
        </MenuItem>
      </StyledLink>
    </Container>
  );
};

export default Menubar;
