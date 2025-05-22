import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  height: 335px;
`;
const Contents = styled.div`
  display: flex;
  width: 100%;
  padding: 14px;
  gap: 12px;
`;
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
const Label = styled.div`
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
`;

const SubLabel = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #999;
  white-space: nowrap;
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
    background-color: #ececec;
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
  span {
    font-size: 14px;
    color: #ececec;
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
`;

const Onecmp = styled.div`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 8px;
`;
const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SettingAI2 = () => {
  const [selected, setSelected] = useState("주");
  return (
    <Container>
      <Header>
        <Title>설정</Title>
      </Header>
      <Contents>
        <LeftContainer>
          <Onecmp>
            <Row1>
              <Label>모델 학습</Label>
              <Toggle />
            </Row1>
            <Row1>
              <SubLabel>주기</SubLabel>
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
            </Row1>
          </Onecmp>
          <Onecmp>
            <Row1>
              <Label>다회 욕설 사용자 정지</Label>
              <Toggle />
            </Row1>
            <Row1>
              <SubLabel>횟수 임계치</SubLabel>
              <Input />
            </Row1>
          </Onecmp>
          <Onecmp>
            <Row1>
              <Label>과적립 사용자 정지</Label>
              <Toggle />
            </Row1>
            <Row1>
              <SubLabel>개수 임계치</SubLabel>
              <Input />
            </Row1>
          </Onecmp>
        </LeftContainer>
        <RightContainer>
          <Onecmp>
            <Row1>
              <Label>욕설탐지</Label>
              <Toggle />
            </Row1>
            <Row1>
              <SubLabel>민감도</SubLabel>
              <Input />
            </Row1>
          </Onecmp>
          <Onecmp>
            <Row1>
              <Label>키워드분석</Label>
              <Toggle />
            </Row1>
            <Row1>
              <SubLabel>민감도</SubLabel>
              <Input />
            </Row1>
            <Row1>
              <SubLabel>주기</SubLabel>
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
            </Row1>
          </Onecmp>
        </RightContainer>
      </Contents>
    </Container>
  );
};
export default SettingAI2;
