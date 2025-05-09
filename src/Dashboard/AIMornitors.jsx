import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  height: 200px;
  width: 100%;
  padding: 14px;
  border: 1px solid #f5f5f5;
  border-radius: 15px;
  background-color: #ffffff;
  flex: 1;
`;
const Title = styled.div`
  font-size: 14px;
  color: #bcbcbc;
  font-weight: 700;
  padding-top: 2px;
  margin-bottom: 18px;
`;
const SubTitleContainer = styled.div`
  height: 34px;
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
`;
const SubTitle = styled.div`
  color: #828282;
  font-size: 12px;
  font-weight: bold;
`;
const TimeContainer = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
`;

const Time = styled.div`
  font-size: 12px;
`;

const AIMornitors = () => {
  return (
    <Container>
      <Title>AI 모델 모니터</Title>
      <SubTitleContainer>
        <SubTitle>마지막 카페 특성 추출</SubTitle>
      </SubTitleContainer>
      <TimeContainer>
        <Time>3월 25일 18시 03분</Time>
      </TimeContainer>
      <SubTitleContainer>
        <SubTitle>다음 카페 특성 추출</SubTitle>
      </SubTitleContainer>
      <TimeContainer>
        <Time>3월 25일 18시 03분</Time>
      </TimeContainer>
    </Container>
  );
};

export default AIMornitors;
