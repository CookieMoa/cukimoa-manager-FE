import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

import UserModal from "./UserModal";

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  height: 87vh; // 화면 높이의 50%로 설정
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
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: #f5f5f5;
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
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: #999;
  background-color: #fff;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px 16px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

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

const RegisterUsers = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (cafe) => {
    setSelectedCafe(cafe);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCafe(null);
  };

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState(""); // 입력값
  const [debouncedKeyword, setDebouncedKeyword] = useState(""); // 디바운스된 값

  // 데이터 fetch 함수
  const fetchCafes = async (searchKeyword = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await axios.get(
        `${API_URL}/admin/all/user${
          searchKeyword ? `?keyword=${searchKeyword}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === "COMMON200") {
        setData(response.data.result.userList);
      }
    } catch (err) {
      console.error("유저 불러오기 실패", err);
    }
  };

  // 1. 첫 마운트에 전체 카페 불러오기
  useEffect(() => {
    fetchCafes();
  }, []);

  // 2. keyword가 바뀔 때마다 디바운스 걸어서 자동 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCafes(keyword);
    }, 500); // 0.5초 기다렸다 실행

    return () => clearTimeout(timer); // keyword 바뀌면 기존 타이머 삭제
  }, [keyword]);

  return (
    <Container>
      <Header>
        <Title>등록 카페</Title>

        <SearchBox>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="유저 이름 검색"
          />
          <SearchIcon src="/images/search.svg" />
        </SearchBox>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <Tr>
              {/* <Th>ID</Th> */}
              <Th>닉네임</Th>
              <Th>가입일</Th>
              <Th>이용 카페 수</Th>
              <Th>현재 쿠폰 수</Th>
              <Th>사용 쿠폰 수</Th>
              <Th>누적 쿠폰 수</Th>
            </Tr>
          </thead>
          <tbody>
            {/* {data.map((item, idx) => (
              
              <Tr
                key={idx}
                onClick={() => handleRowClick(item)}
                style={{ cursor: "pointer" }}
              >
                <Td>{item.customerId}</Td>
                <Td>{item.name}</Td>
                <Td>{item.date}</Td>
                <Td>{item.rewards}</Td>
                <Td>{item.issued}</Td>
                <Td>{item.used}</Td>
                <Td>{item.rate}</Td>
              </Tr>
            ))} */}
            {data.map((item, idx) => {
              // 1. 날짜 포맷 YYYY-MM-DD
              const formattedDate = item.createdAt?.slice(0, 10); // "2025-05-04"
              const nowStamp = item.totalStampCount - item.totalUsedStampCount
              return (
                <Tr
                  key={idx}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <Td>{item.customerId}</Td> */}
                  <Td>{item.name}</Td>
                  <Td>{formattedDate}</Td>
                  <Td>{item.visitedCafeCount}</Td>
                  <Td>{nowStamp}</Td>
                  <Td>{item.totalUsedStampCount}</Td>
                  <Td>{item.totalStampCount}</Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
      {isModalVisible && (
        <UserModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          cafe={selectedCafe}
        />
      )}
    </Container>
  );
};

export default RegisterUsers;
