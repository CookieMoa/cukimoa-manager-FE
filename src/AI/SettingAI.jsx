import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  /* overflow-y: auto; // 내용이 넘칠 경우 세로 스크롤을 추가 */
  height: 335px;
  padding-bottom: 5px;
  /* display: flex; */
`;
const Contents = styled.div`
  display: flex;
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
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
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: flex-start; */
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  width: 480px;
  margin-left: 12px;
  margin-right: 12px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 14px;
`;

const SubLabel = styled.div`
  font-size: 13px;
  color: #999;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Toggle = styled.input.attrs({ type: "checkbox" })`
  width: 42px;
  height: 24px;
  appearance: none;
  background-color: #ccc;
  border-radius: 12px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
  margin-bottom: 12px;

  &:checked {
    background-color: #4caf50;
  }

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s;
  }

  &:checked:before {
    transform: translateX(18px);
  }
`;

const WeekSelector = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 8px;
  span {
    font-size: 14px;
    color: #bcbcbc;
    cursor: pointer;
  }

  .selected {
    color: #00c200;
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 48px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 8px;
  font-size: 14px;
  margin-left: 10px;
`;

const SettingAI = () => {
  const [selected, setSelected] = useState("주");
  return (
    <Container>
      <Header>
        <Title>설정</Title>
      </Header>
      <Contents>
        <LeftContainer>
          <Row>
            <Left>
              <Label>모델 학습</Label>
              <SubLabel>주기</SubLabel>
            </Left>
            <Right>
              <Toggle />
              <WeekSelector>
                {["일", "주", "월"].map((day) => (
                  <span
                    key={day}
                    className={selected === day ? "selected" : ""}
                    onClick={() => setSelected(day)}
                  >
                    {day}
                  </span>
                ))}
              </WeekSelector>
            </Right>
          </Row>
          <Row>
            <Left>
              <Label>다회 욕설 사용자 정지</Label>
              <SubLabel>횟수 임계치</SubLabel>
            </Left>
            <Right>
              <Toggle />
              <Input />
            </Right>
          </Row>
          <Row>
            <Left>
              <Label>과적립 사용자 정지</Label>
              <SubLabel>횟수 임계치</SubLabel>
            </Left>
            <Right>
              <Toggle />
              <Input />
            </Right>
          </Row>
        </LeftContainer>
        <RightContainer>
          <Row>
            <Left>
              <Label>과적립 사용자 정지</Label>
              <SubLabel>횟수 임계치</SubLabel>
            </Left>
            <Right>
              <Toggle />
              <Input />
            </Right>
          </Row>
          <Row>
            <Left>
              <Label>모델 학습</Label>
              <SubLabel>주기</SubLabel>
            </Left>
            <Right>
              <Toggle />
              <Input />
              <WeekSelector>
                {["일", "주", "월"].map((day) => (
                  <span
                    key={day}
                    className={selected === day ? "selected" : ""}
                    onClick={() => setSelected(day)}
                  >
                    {day}
                  </span>
                ))}
              </WeekSelector>
            </Right>
          </Row>
        </RightContainer>
      </Contents>
    </Container>
  );
};
export default SettingAI;
