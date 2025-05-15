import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 80vh;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  padding-top: 20px;
  white-space: nowrap;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  white-space: nowrap;
`;
const LogoImgs = styled.img`
  width: 14px;
  height: 14px;
`;
const InfoTitle = styled.div`
  font-size: 14px;
  color: #bcbcbc;
  white-space: nowrap;
`;
const InfoText = styled.div`
  font-size: 14px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-top: 20px;
  gap: 12px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;
const ImageContainer = styled.img`
  width: 100%;
  border-radius: 20px;
  height: 140px;
  width: 140px;
  border-radius: 100px;
  margin-top: 12px;
`;
const Contents = styled.div`
  display: flex;
  gap: 12px;
`;
const OneLine = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: normal; /* 줄바꿈 허용 */
`;
const SecondLine = styled.div`
  flex: 1;
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: normal; /* 줄바꿈 허용 */
`;
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-top: 14px;
  gap: 20px;
`;
const ThirdLine = styled.div`
  flex: 3;
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: normal; /* 줄바꿈 허용 */
`;
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap; /* 태그가 넘칠 경우 자동으로 줄바꿈 */
`;
const Tag = styled.div`
  display: inline-block;
  border-radius: 999px;
  border: 1px solid #dab789;
  padding: 1px 7px;
  color: #dab789;
  font-weight: 700;
  font-size: 12px;
  margin: 3px;
  white-space: nowrap;
`;
const DeleteButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ff5b5b;
  border: 1px solid #ff5b5b;
  padding: 7px 17px;
  background-color: #fff;
  border-radius: 20px;

  &:hover {
    background-color: #ff5b5b;
    color: white;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
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
  padding: 8px 16px;
  font-weight: 600;
  color: #999;
  background-color: #f5f5f5;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 8px 16px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-align: left;
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
  display: flex;
  justify-content: space-between;
  &:nth-child(odd) {
    background-color: #f5f5f5;
  }
`;

const keywordOptions = [
  { value: "quiet", label: "조용한" },
  { value: "study_friendly", label: "공부하기 좋은" },
  { value: "power_outlets", label: "콘센트 많음" },
  { value: "spacious", label: "넓은 공간" },
  { value: "cozy", label: "아늑한 분위기" },
  { value: "good_coffee", label: "커피 맛집" },
  { value: "dessert", label: "디저트 맛집" },
  { value: "instagrammable", label: "사진 찍기 좋은" },
  { value: "pet_friendly", label: "반려동물 출입 가능" },
  { value: "late_open", label: "늦게까지 영업" },
];

const UserModal = ({ visible, onClose, cafe }) => {
  const formattedDate = cafe.createdAt?.slice(0, 10); // "2025-05-04"
  const nowStamp = cafe.totalStampCount - cafe.totalUsedStampCount;
  console.log(cafe.reviewList);
  const [userState, setUserState] = useState(cafe.accountStatus);

  const handleUserUnlock = async (userId) => {
    console.log("userId", userId);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        //  return navigation.replace("LoginScreen");
        console.log("no token");
      }
      const response = await axios.patch(
        `${API_URL}/admin/user/unlock/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.code == "COMMON200") {
        console.log("락 해제됨");
        setUserState("ACTIVE");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  const handleUserLock = async (userId) => {
    console.log("userId", userId);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        //  return navigation.replace("LoginScreen");
        console.log("no token");
      }
      const response = await axios.patch(
        `${API_URL}/admin/user/lock/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.code == "COMMON200") {
        console.log("락 됨");
        setUserState("LOCKED");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <Header>
          <Title>{cafe.name}</Title>
          <LogoImgs src="/images/x.svg" onClick={onClose} />
        </Header>
        <Contents>
          <OneLine>
            <Header>
              <InfoTitle>프로필 이미지</InfoTitle>
            </Header>
            <ImageContainer src={cafe.imgUrl} />
          </OneLine>
          <SecondLine>
            <InfoContainer>
              <Info>
                <InfoTitle>ID</InfoTitle>
                <InfoText>{cafe.customerId}</InfoText>
              </Info>
              <Info>
                <InfoTitle>가입일</InfoTitle>
                <InfoText>{formattedDate}</InfoText>
              </Info>
              <Info>
                <InfoTitle>이메일</InfoTitle>
                <InfoText>{cafe.email}</InfoText>
              </Info>
              <Info>
                <InfoTitle>이용 카페 수</InfoTitle>
                <InfoText>{cafe.visitedCafeCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>보유 쿠폰 수</InfoTitle>
                <InfoText>{nowStamp}</InfoText>
              </Info>
              <Info>
                <InfoTitle>사용 쿠폰 수</InfoTitle>
                <InfoText>{cafe.totalUsedStampCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>누적 쿠폰 수</InfoTitle>
                <InfoText>{cafe.totalStampCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>선호 특성</InfoTitle>
                {cafe.keywordList.length > 0 ? (
                  cafe.keywordList.map((k) => {
                    const match = keywordOptions.find(
                      (opt) => opt.value === k.name
                    );
                    return match ? (
                      <Tag key={k.keywordId}># {match.label}</Tag>
                    ) : null;
                  })
                ) : (
                  <Tag>선호 특성이 없습니다</Tag>
                )}
              </Info>
            </InfoContainer>
          </SecondLine>
          <ThirdLine>
            <Header>
              <InfoTitle>악성 의심 리뷰</InfoTitle>
            </Header>
            <TableContainer>
              <Table>
                <tbody>
                  {cafe.maliciousReviewList.length > 0 ? (
                    cafe.maliciousReviewList.map((item) => (
                      <Tr key={item.reviewId}>
                        <Td>{item.content}</Td> {/* 리뷰 내용 */}
                        <Td>{item.createdAt.split(" ")[0]}</Td>{" "}
                        {/* 날짜만 추출 */}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={1}>작성한 악성 리뷰가 없습니다</Td>
                    </Tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>
            <Header>
              <InfoTitle>작성한 리뷰</InfoTitle>
            </Header>
            <TableContainer>
              <Table>
                <tbody>
                  {cafe.reviewList.length > 0 ? (
                    cafe.reviewList.map((item) => (
                      <Tr key={item.reviewId}>
                        <Td>{item.content}</Td> {/* 리뷰 내용 */}
                        <Td>{item.createdAt.split(" ")[0]}</Td>{" "}
                        {/* 날짜만 추출 */}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={1}>작성한 리뷰가 없습니다</Td>
                    </Tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </ThirdLine>
        </Contents>
        <DeleteButton
          onClick={() =>
            userState === "LOCKED"
              ? handleUserUnlock(cafe.customerId)
              : handleUserLock(cafe.customerId)
          }
        >
          {userState === "LOCKED" ? "정지 해제" : "유저 정지"}
        </DeleteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserModal;
