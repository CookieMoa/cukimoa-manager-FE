import React from "react";
import styled from "styled-components";

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

const CafeModal = ({ visible, onClose, cafe }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <Header>
          <Title>아메아메</Title>
          <LogoImgs src="/images/x.svg" onClick={onClose} />
        </Header>
        <Contents>
          <OneLine>
            <Header>
              <InfoTitle>메인 이미지</InfoTitle>
            </Header>
            <ImageContainer src="./images/cafeameame.png" />
            <InfoContainer>
              <Info>
                <InfoTitle>ID</InfoTitle>
                <InfoText>3</InfoText>
              </Info>
              <Info>
                <InfoTitle>리워드 수</InfoTitle>
                <InfoText>3</InfoText>
              </Info>
              <Info>
                <InfoTitle>등록일</InfoTitle>
                <InfoText>2025.03.25</InfoText>
              </Info>
              <Info>
                <InfoTitle>발급 쿠폰 수</InfoTitle>
                <InfoText>500</InfoText>
              </Info>
              <Info>
                <InfoTitle>위치</InfoTitle>
                <InfoText>수정구 복정동</InfoText>
              </Info>
              <Info>
                <InfoTitle>사용 쿠폰 수</InfoTitle>
                <InfoText>300</InfoText>
              </Info>
              <Info>
                <InfoTitle>시간</InfoTitle>
                <InfoText>9시 ~ 21시</InfoText>
              </Info>
              <Info>
                <InfoTitle>쿠폰 사용율</InfoTitle>
                <InfoText>60 %</InfoText>
              </Info>
            </InfoContainer>
          </OneLine>
          <SecondLine>
            <Header>
              <InfoTitle>지도</InfoTitle>
            </Header>
            <ImageContainer src="/images/cafemap.png" />
            <Infos>
              <Info>
                <InfoTitle>소개글</InfoTitle>
                <InfoText>
                  안녕하세요 카페 아메아메입니다. 아메아메와 아메제과는 같은
                  매장입니다. 휘낭시에, 소금빵, 음료가 맛있는 카페입니다^.^
                </InfoText>
              </Info>
              <Info>
                <InfoTitle>리워드</InfoTitle>
                <InfoText>샷추가 10</InfoText>
                <InfoText>케이크 30</InfoText>
                <InfoText>휘낭시에 15</InfoText>
              </Info>
            </Infos>
          </SecondLine>
          <ThirdLine>
            <Header>
              <InfoTitle>광고</InfoTitle>
            </Header>
            <ImageContainer src="/images/cafead.png" />
            <Infos>
              <InfoTitle>카페 특성</InfoTitle>
              <TagList>
                <Tag># 조용한</Tag>
                <Tag># 음악이 좋은</Tag>
                <Tag># 집중이 잘 되는</Tag>
              </TagList>
            </Infos>
          </ThirdLine>
        </Contents>
        <DeleteButton>카페 삭제</DeleteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CafeModal;
