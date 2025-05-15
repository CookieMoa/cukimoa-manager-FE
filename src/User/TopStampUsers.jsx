import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  height: 40vh; // 화면 높이의 50%로 설정
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
  white-space: nowrap;
`;

const InfoText = styled.div`
  font-size: 13px;
  color: #bcbcbc;
  font-weight: 500;
`;
const TableContainer = styled.div`
  padding: 14px;
  display: flex;
  align-items: center;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  font-size: 14px;
  text-align: center;
  padding: 8px 16px;
  font-weight: 600;
  color: #999;
  background-color: #fff;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 8px 16px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  // 첫 번째 셀 (왼쪽 끝)인 경우 radius 적용
  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  // 마지막 셀 (오른쪽 끝)인 경우 radius 적용
  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f5f5f5;
  }
`;

const SearchIcon = styled.img``;

const TopStampUsers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          //  return navigation.replace("LoginScreen");
          console.log("no token");
        }
        const response = await axios.get(`${API_URL}/admin/user/rank`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          setData(response.data.result.issue);
          console.log("최근 스탬프 목록", data);
        } else {
          // setCachedData([]);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    getDatas();
  }, []);

  return (
    <Container>
      <Header>
        <Title>스탬프 발급 순</Title>
        <InfoText>* 월 기준</InfoText>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <Tr>
              <Th>닉네임</Th>
              <Th>적립 수</Th>
            </Tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <Tr key={idx}>
                <Td>{item.name}</Td>
                <Td>{item.totalStampCount}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TopStampUsers;
