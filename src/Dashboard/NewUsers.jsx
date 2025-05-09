import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  flex: 2;
  height: 200px;
  width: 100%;
  padding: 14px;
  border: 1px solid #f5f5f5;
  border-radius: 15px;
  background-color: #ffffff;
`;
const Title = styled.div`
  font-size: 14px;
  color: #bcbcbc;
  font-weight: 700;
  padding-top: 2px;
  margin-bottom: 18px;
`;
const User = styled.div`
  height: 38px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const UserName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
const Time = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #bcbcbc;
`;
const NewUsers = () => {
  return (
    <Container>
      <Title>신규 가입 유저</Title>
      <User>
        <UserName>카페인 중독</UserName>
        <Time>1 일전</Time>
      </User>
      <User>
        <UserName>카페인 중독</UserName>
        <Time>1 일전</Time>
      </User>
      <User>
        <UserName>카페인 중독</UserName>
        <Time>1 일전</Time>
      </User>
    </Container>
  );
};

export default NewUsers;
