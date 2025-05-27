import React from "react";
import styled from "styled-components";
import CafeModal from "./CafeModal";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

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

const RegisterCafes = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyword, setKeyword] = useState(""); // 입력값
  const [debouncedKeyword, setDebouncedKeyword] = useState(""); // 디바운스된 값

  const handleRowClick = (cafe) => {
    setSelectedCafe(cafe);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCafe(null);
  };

  const [data, setData] = useState([]);

  // 데이터 fetch 함수
  const fetchCafes = async (searchKeyword = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await axios.get(
        `${API_URL}/admin/all/cafe${
          searchKeyword ? `?keyword=${searchKeyword}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === "COMMON200") {
        setData(response.data.result.cafeList);
      }
    } catch (err) {
      console.error("카페 불러오기 실패", err);
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
            placeholder="카페 이름 검색"
          />
          <SearchIcon src="/images/search.svg" />
        </SearchBox>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <Tr>
              {/* <Th>ID</Th> */}
              <Th>매장명</Th>
              <Th>등록일</Th>
              <Th>리워드 수</Th>
              <Th>발급 쿠폰 수</Th>
              <Th>사용 쿠폰 수</Th>
              <Th>쿠폰 사용율</Th>
            </Tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              // 1. 날짜 포맷 YYYY-MM-DD
              const formattedDate = item.createdAt?.slice(0, 10); // "2025-05-04"

              // 2. 리워드 수
              const rewardCount = item.rewardList?.length || 0;

              // 3. 사용률(rate) 계산 (소수점 첫째 자리까지)
              const total = item.totalStampCount || 0;
              const used = item.totalUsedStampCount || 0;
              const rate =
                total === 0 ? 0 : Number(((used / total) * 100).toFixed(1));

              return (
                <Tr
                  key={idx}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <Td>{item.cafeId}</Td> */}
                  <Td>{item.name}</Td>
                  <Td>{formattedDate}</Td>
                  <Td>{rewardCount}</Td>
                  <Td>{total}</Td>
                  <Td>{used}</Td>
                  <Td>{rate}%</Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
      {isModalVisible && (
        <CafeModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          cafe={selectedCafe}
        />
      )}
    </Container>
  );
};

export default RegisterCafes;
