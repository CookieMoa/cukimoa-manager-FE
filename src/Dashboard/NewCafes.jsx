import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  height: 200px;
  width: 100%;
  border: 1px solid #f5f5f5;
  border-radius: 15px;
  background-color: #ffffff;
  padding: 15px;
  flex: 2;
  flex-shrink: 0;
  min-width: 0;
`;
const Title = styled.div`
  font-size: 14px;
  color: #bcbcbc;
  font-weight: 700;
  padding-top: 2px;
  margin-bottom: 18px;
`;
const Cafes = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;

  /* 스크롤바 커스터마이징 - 필요시 */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const CafeContainer = styled.div`
  width: 130px;
  height: 150px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px 15px 0 0; /* 상단 모서리 둥글게 맞추기 */
    display: block;
  }
`;
const CafeInfoContainer = styled.div`
  padding: 8px;
  box-sizing: border-box;
`;
const CafeName = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`;
const CafeInfo = styled.div`
  font-size: 10px;
  color: #bcbcbc;
  font-weight: bold;
`;

const NewCafes = () => {
  return (
    <Container>
      <Title>신규 추가 카페</Title>
      <Cafes>
        <CafeContainer>
          <ImageContainer>
            <img src="/images/cafeameame.png" />
          </ImageContainer>
          <CafeInfoContainer>
            <CafeName>아메아메</CafeName>
            <CafeInfo>수정구 · 오늘</CafeInfo>
          </CafeInfoContainer>
        </CafeContainer>
        <CafeContainer>
          <ImageContainer>
            <img src="/images/cafeameame.png" />
          </ImageContainer>
          <CafeInfoContainer>
            <CafeName>아메아메</CafeName>
            <CafeInfo>수정구 · 오늘</CafeInfo>
          </CafeInfoContainer>
        </CafeContainer>
        <CafeContainer>
          <ImageContainer>
            <img src="/images/cafeameame.png" />
          </ImageContainer>
          <CafeInfoContainer>
            <CafeName>아메아메</CafeName>
            <CafeInfo>수정구 · 오늘</CafeInfo>
          </CafeInfoContainer>
        </CafeContainer>
        <CafeContainer>
          <ImageContainer>
            <img src="/images/cafeameame.png" />
          </ImageContainer>
          <CafeInfoContainer>
            <CafeName>아메아메</CafeName>
            <CafeInfo>수정구 · 오늘</CafeInfo>
          </CafeInfoContainer>
        </CafeContainer>
        <CafeContainer>
          <ImageContainer>
            <img src="/images/cafeameame.png" />
          </ImageContainer>
          <CafeInfoContainer>
            <CafeName>아메아메</CafeName>
            <CafeInfo>수정구 · 오늘</CafeInfo>
          </CafeInfoContainer>
        </CafeContainer>
      </Cafes>
    </Container>
  );
};

export default NewCafes;
