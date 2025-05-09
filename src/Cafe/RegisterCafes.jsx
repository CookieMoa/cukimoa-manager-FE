import React from "react";
import styled from "styled-components";
import { useState } from "react";
import CafeModal from "./CafeModal";

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

const data = [
  {
    id: 1,
    name: "카페라떼",
    date: "2025.01.10",
    rewards: 5,
    issued: 800,
    used: 640,
    rate: "80%",
  },
  {
    id: 2,
    name: "카페모카",
    date: "2025.02.18",
    rewards: 4,
    issued: 600,
    used: 420,
    rate: "70%",
  },
  {
    id: 3,
    name: "아메아메",
    date: "2025.03.25",
    rewards: 3,
    issued: 500,
    used: 300,
    rate: "60%",
  },
  {
    id: 4,
    name: "바닐라빈",
    date: "2025.03.30",
    rewards: 2,
    issued: 400,
    used: 100,
    rate: "25%",
  },
  {
    id: 5,
    name: "에스프레소잇",
    date: "2025.04.05",
    rewards: 6,
    issued: 700,
    used: 630,
    rate: "90%",
  },
  {
    id: 6,
    name: "드립앤립",
    date: "2025.04.15",
    rewards: 4,
    issued: 450,
    used: 200,
    rate: "44%",
  },
  {
    id: 7,
    name: "소이라떼",
    date: "2025.04.21",
    rewards: 3,
    issued: 550,
    used: 330,
    rate: "60%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
  {
    id: 8,
    name: "밤부커피",
    date: "2025.04.25",
    rewards: 5,
    issued: 650,
    used: 600,
    rate: "92%",
  },
];

const SearchIcon = styled.img``;

const RegisterCafes = () => {
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

  return (
    <Container>
      <Header>
        <Title>등록 카페</Title>

        <SearchBox>
          <SearchInput />
          <SearchIcon src="/images/search.svg" />
        </SearchBox>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <Tr>
              <Th>ID</Th>
              <Th>매장명</Th>
              <Th>등록일</Th>
              <Th>리워드 수</Th>
              <Th>발급 쿠폰 수</Th>
              <Th>사용 쿠폰 수</Th>
              <Th>쿠폰 사용율</Th>
            </Tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <Tr
                key={idx}
                onClick={() => handleRowClick(item)}
                style={{ cursor: "pointer" }}
              >
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.date}</Td>
                <Td>{item.rewards}</Td>
                <Td>{item.issued}</Td>
                <Td>{item.used}</Td>
                <Td>{item.rate}</Td>
              </Tr>
            ))}
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
