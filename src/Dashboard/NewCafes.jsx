import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  width: 180px;
  height: 160px;
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          //  return navigation.replace("LoginScreen");
          console.log("no token");
        }
        const response = await axios.get(`${API_URL}/admin/recent-cafe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          setData(response.data.result.cafeList);
          console.log("최근 카페 목록", data);
        } else {
          // setCachedData([]);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    getDatas();
  }, []);
  const getDaysAgo = (dateString) => {
    const givenDate = new Date(dateString);
    const today = new Date();

    // 시, 분, 초 제거 (날짜 비교용)
    const given = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate()
    );
    const now = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffTime = now.getTime() - given.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘";
    return `${diffDays}일 전`;
  };

  return (
    <Container>
      <Title>신규 추가 카페</Title>
      <Cafes>
        {data.map((cafe) => {
          const addressParts = cafe.address.split(" ");
          const region = addressParts.slice(0, 2).join(" "); // "서울 성동구"

          return (
            <CafeContainer key={cafe.cafeId}>
              <ImageContainer>
                <img src={cafe.imgUrl} alt={cafe.name} />
              </ImageContainer>
              <CafeInfoContainer>
                <CafeName>{cafe.name}</CafeName>
                <CafeInfo>
                  {region} · {getDaysAgo(cafe.createdAt)}
                </CafeInfo>
              </CafeInfoContainer>
            </CafeContainer>
          );
        })}
      </Cafes>
    </Container>
  );
};

export default NewCafes;
