import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

  &:focus {
    outline: none;
  }
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
  const [settingData, setSettingData] = useState({
    isModelLearning: false,
    modelLearningCycle: "WEEKLY",
    isKeywordAnalysis: false,
    keywordAnalysisCycle: "WEEKLY",
    isBlockRepeatedAbuser: false,
    abuseThreshold: 0,
    isBlockMaliciousUser: false,
    maliciousThreshold: 0,
    isDetectMaliciousReview: false,
  });

  // 🔹 PATCH 요청 함수
  const patchSetting = async (setting, value) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_URL}/admin/setting?setting=${setting}&value=${value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`${setting} updated to ${value}`);
    } catch (err) {
      console.error("PATCH error:", err);
    }
  };

  // 🔹 GET 설정 데이터
  const getSetting = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_URL}/admin/setting`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === "COMMON200") {
        setSettingData(response.data.result);
      }
    } catch (error) {
      console.error("GET error:", error);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  // 🔹 토글 핸들러
  const handleToggle = (key, settingName) => {
    const newValue = !settingData[key];
    setSettingData((prev) => ({ ...prev, [key]: newValue }));
    patchSetting(settingName, newValue);
  };

  // 🔹 주기 변경 핸들러
  const handleCycleChange = (key, settingName, value) => {
    setSettingData((prev) => ({ ...prev, [key]: value }));
    patchSetting(settingName, value);
  };

  // 🔹 임계치 입력 핸들러
  const handleThresholdChange = (key, settingName, value) => {
    const numericValue = parseInt(value) || 0;
    setSettingData((prev) => ({ ...prev, [key]: numericValue }));
    patchSetting(settingName, numericValue);
  };

  return (
    <Container>
      <Header>
        <Title>설정</Title>
      </Header>
      <Contents>
        <LeftContainer>
          {/* 모델 학습 */}
          <Onecmp>
            <Row1>
              <Label>모델 학습</Label>
              <Toggle
                checked={settingData.isModelLearning}
                onChange={() =>
                  handleToggle("isModelLearning", "MODEL_LEARNING")
                }
              />
            </Row1>
            <Row1>
              <SubLabel>주기</SubLabel>
              <WeekSelector>
                {["DAILY", "WEEKLY", "MONTHLY"].map((value) => (
                  <span
                    key={value}
                    className={
                      settingData.modelLearningCycle === value ? "selected" : ""
                    }
                    onClick={() =>
                      handleCycleChange(
                        "modelLearningCycle",
                        "MODEL_LEARNING_CYCLE",
                        value
                      )
                    }
                  >
                    {value === "DAILY"
                      ? "일"
                      : value === "WEEKLY"
                      ? "주"
                      : "월"}
                  </span>
                ))}
              </WeekSelector>
            </Row1>
          </Onecmp>

          {/* 욕설 사용자 정지 */}
          <Onecmp>
            <Row1>
              <Label>다회 욕설 사용자 정지</Label>
              <Toggle
                checked={settingData.isBlockRepeatedAbuser}
                onChange={() =>
                  handleToggle("isBlockRepeatedAbuser", "BLOCK_REPEATED_ABUSER")
                }
              />
            </Row1>
            <Row1>
              <SubLabel>횟수 임계치</SubLabel>
              <Input
                value={settingData.abuseThreshold}
                onChange={(e) =>
                  handleThresholdChange(
                    "abuseThreshold",
                    "ABUSE_THRESHOLD",
                    e.target.value
                  )
                }
              />
            </Row1>
          </Onecmp>

          {/* 과적립 사용자 정지 */}
          <Onecmp>
            <Row1>
              <Label>과적립 사용자 정지</Label>
              <Toggle
                checked={settingData.isBlockMaliciousUser}
                onChange={() =>
                  handleToggle("isBlockMaliciousUser", "BLOCK_MALICIOUS_USER")
                }
              />
            </Row1>
            <Row1>
              <SubLabel>개수 임계치</SubLabel>
              <Input
                value={settingData.maliciousThreshold}
                onChange={(e) =>
                  handleThresholdChange(
                    "maliciousThreshold",
                    "MALICIOUS_THRESHOLD",
                    e.target.value
                  )
                }
              />
            </Row1>
          </Onecmp>
        </LeftContainer>

        <RightContainer>
          {/* 욕설 탐지 */}
          <Onecmp>
            <Row1>
              <Label>욕설 탐지</Label>
              <Toggle
                checked={settingData.isDetectMaliciousReview}
                onChange={() =>
                  handleToggle(
                    "isDetectMaliciousReview",
                    "DETECT_MALICIOUS_REVIEW"
                  )
                }
              />
            </Row1>
          </Onecmp>

          {/* 키워드 분석 */}
          <Onecmp>
            <Row1>
              <Label>키워드 분석</Label>
              <Toggle
                checked={settingData.isKeywordAnalysis}
                onChange={() =>
                  handleToggle("isKeywordAnalysis", "KEYWORD_ANALYSIS")
                }
              />
            </Row1>
            <Row1>
              <SubLabel>주기</SubLabel>
              <WeekSelector>
                {["DAILY", "WEEKLY", "MONTHLY"].map((value) => (
                  <span
                    key={value}
                    className={
                      settingData.keywordAnalysisCycle === value
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      handleCycleChange(
                        "keywordAnalysisCycle",
                        "KEYWORD_ANALYSIS_CYCLE",
                        value
                      )
                    }
                  >
                    {value === "DAILY"
                      ? "일"
                      : value === "WEEKLY"
                      ? "주"
                      : "월"}
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
