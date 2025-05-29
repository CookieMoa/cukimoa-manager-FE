import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  overflow-y: auto;
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
  padding: 13px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 13px;
`;
const UserName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
const Time = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #bcbcbc;
`;
const NewUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          //  return navigation.replace("LoginScreen");
          console.log("no token");
        }
        const response = await axios.get(`${API_URL}/admin/recent-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          setData(response.data.result.userList);
          console.log("최근 유저 목록", data);
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
    return `${diffDays} 일 전`;
  };

  return (
    <Container>
      <Title>신규 가입 유저</Title>
      {data.map((user) => {
        return (
          <User>
            <UserName>{user.name}</UserName>
            <Time>{getDaysAgo(user.createdAt)}</Time>
          </User>
        );
      })}
    </Container>
  );
};

export default NewUsers;
