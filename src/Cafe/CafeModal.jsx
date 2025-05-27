import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
import KakaoMap from "./KakaoMap";

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 20px;
  padding: 5px;
  padding-top: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;
const ImageContainer = styled.img`
  margin-top: 5px;
  width: 100%;
  border-radius: 20px;
  height: 215px;
`;
const Contents = styled.div`
  display: flex;
  gap: 12px;
`;
const OneLine = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: normal; /* 줄바꿈 허용 */
`;
const SecondLine = styled.div`
  flex: 3;
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
  flex: 1;
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

const Map = styled.div`
  margin-top: 5px;
  height: 215px;
  border-radius: 20px;
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

const CafeModal = ({ visible, onClose, cafe }) => {
  // 1. 날짜 포맷 YYYY-MM-DD
  const formattedDate = cafe.createdAt?.slice(0, 10); // "2025-05-04"

  // 2. 리워드 수
  const rewardCount = cafe.rewardList?.length || 0;

  // 3. 사용률(rate) 계산 (소수점 첫째 자리까지)
  const total = cafe.totalStampCount || 0;
  const used = cafe.totalUsedStampCount || 0;
  const rate = total === 0 ? 0 : ((used / total) * 100).toFixed(1);

  const [cafeState, setCafeState] = useState(cafe.cafeStatus);
  console.log("카페스테이트::", cafeState);
  console.log("카페id::", cafe.cafeId);

  const handleCafeUnlock = async (userId) => {
    console.log("불러는와짐 unlock이")
    console.log("userId", userId);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        //  return navigation.replace("LoginScreen");
        console.log("no token");
      }
      const response = await axios.patch(
        `${API_URL}/admin/cafe/unlock/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.code == "COMMON200") {
        console.log("락 해제됨");
        setCafeState("ACTIVE");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  const handleCafeLock = async (userId) => {
    console.log("userId", userId);
    console.log("불러는와짐 lock이")
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        //  return navigation.replace("LoginScreen");
        console.log("no token");
      }
      const response = await axios.patch(
        `${API_URL}/admin/cafe/lock/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.code == "COMMON200") {
        console.log("락 됨");
        setCafeState("LOCKED");
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
              <InfoTitle>메인 이미지</InfoTitle>
            </Header>
            {cafe.imgUrl ? (
              <ImageContainer src={cafe.imgUrl} />
            ) : (
              <InfoText>현재 카페 이미지가 없습니다</InfoText>
            )}
            <InfoContainer>
              <Info>
                <InfoTitle>ID</InfoTitle>
                <InfoText>{cafe.cafeId}</InfoText>
              </Info>
              <Info>
                <InfoTitle>리워드 수</InfoTitle>
                <InfoText>{rewardCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>등록일</InfoTitle>
                <InfoText>{formattedDate}</InfoText>
              </Info>
              <Info>
                <InfoTitle>발급 쿠폰 수</InfoTitle>
                <InfoText>{cafe.totalStampCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>위치</InfoTitle>
                <InfoText>{cafe.address}</InfoText>
              </Info>
              <Info>
                <InfoTitle>사용 쿠폰 수</InfoTitle>
                <InfoText>{cafe.totalUsedStampCount}</InfoText>
              </Info>
              <Info>
                <InfoTitle>시간</InfoTitle>
                <InfoText>
                  {cafe.openTime} ~ {cafe.closeTime}
                </InfoText>
              </Info>
              <Info>
                <InfoTitle>쿠폰 사용율</InfoTitle>
                <InfoText>{rate}</InfoText>
              </Info>
            </InfoContainer>
          </OneLine>
          <SecondLine>
            <Header>
              <InfoTitle>지도</InfoTitle>
            </Header>
            <Map>
              <KakaoMap cafe={cafe} />
            </Map>
            <Infos>
              <Info>
                <InfoTitle>소개글</InfoTitle>
                <InfoText>{cafe.intro}</InfoText>
              </Info>
              <Info>
                <InfoTitle>리워드</InfoTitle>
                {cafe.rewardList && cafe.rewardList.length > 0 ? (
                  cafe.rewardList.map((reward) => (
                    <InfoText key={reward.stampRewardId}>
                      {reward.reward} {reward.stampCount}
                    </InfoText>
                  ))
                ) : (
                  <InfoText>현재 리워드가 없습니다</InfoText>
                )}
              </Info>
            </Infos>
          </SecondLine>
          <ThirdLine>
            <Header>
              <InfoTitle>광고</InfoTitle>
            </Header>
            {cafe.advImgUrl ? (
              <ImageContainer src={cafe.advImgUrl} alt="광고 이미지" />
            ) : (
              <InfoText>현재 광고 이미지가 없습니다</InfoText>
            )}
            <Infos>
              <InfoTitle>카페 특성</InfoTitle>
              <TagList>
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
                  <Tag>카페 특성이 없습니다</Tag>
                )}
              </TagList>
            </Infos>
          </ThirdLine>
        </Contents>
        <DeleteButton
          onClick={() =>
            cafeState === "LOCKED"
              ? handleCafeUnlock(cafe.cafeId)
              : handleCafeLock(cafe.cafeId)
          }
        >
          {cafeState === "LOCKED" ? "정지 해제" : "카페 정지"}
        </DeleteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CafeModal;
