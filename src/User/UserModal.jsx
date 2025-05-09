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
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const data = [
  {
    review: "존나맛있다",
    time: "25.03",
  },
  {
    review: "존나맛있다",
    time: "25.03",
  },
  {
    review: "존나맛있다",
    time: "25.03",
  },
  {
    review: "존나맛있다",
    time: "25.03",
  },
  {
    review: "존나맛있다",
    time: "25.03",
  },
];

const UserModal = ({ visible, onClose, cafe }) => {
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
              <InfoTitle>프로필 이미지</InfoTitle>
            </Header>
            <ImageContainer src="./images/cafeameame.png" />
          </OneLine>
          <SecondLine>
            <InfoContainer>
              <Info>
                <InfoTitle>ID</InfoTitle>
                <InfoText>3</InfoText>
              </Info>
              <Info>
                <InfoTitle>가입일</InfoTitle>
                <InfoText>2025.03.25</InfoText>
              </Info>
              <Info>
                <InfoTitle>이메일</InfoTitle>
                <InfoText>cukimoa@gmail.com</InfoText>
              </Info>
              <Info>
                <InfoTitle>이용 카페 수</InfoTitle>
                <InfoText>511</InfoText>
              </Info>
              <Info>
                <InfoTitle>보유 쿠폰 수</InfoTitle>
                <InfoText>500</InfoText>
              </Info>
              <Info>
                <InfoTitle>사용 쿠폰 수</InfoTitle>
                <InfoText>300</InfoText>
              </Info>
              <Info>
                <InfoTitle>누적 쿠폰 수</InfoTitle>
                <InfoText>300</InfoText>
              </Info>
              <Info>
                <InfoTitle>선호 특성</InfoTitle>
                <TagList>
                  <Tag># 조용한</Tag>
                  <Tag># 음악이 좋은</Tag>
                  <Tag># 집중이 잘 되는</Tag>
                </TagList>
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
                  {data.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.review}</Td>
                      <Td>{item.time}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
            <Header>
              <InfoTitle>작성한 리뷰</InfoTitle>
            </Header>
            <TableContainer>
              <Table>
                <tbody>
                  {data.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{item.review}</Td>
                      <Td>{item.time}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </ThirdLine>
        </Contents>
        <DeleteButton>유저 삭제</DeleteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserModal;
