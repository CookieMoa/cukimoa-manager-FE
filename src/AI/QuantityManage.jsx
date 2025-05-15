import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Quantity from "./Quantity";
// import axios from "axios";
// const API_URL = process.env.REACT_APP_API_URL;
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
  min-width: 800px;
  margin-bottom: 20px;
  height: 140px;
`;
const QunatityManage = () => {
  const titles = [
    "현재 AI 모델 학습 일자 ",
    "이전 모델 대비 성능 향상률",
    "현재 AI 모델 버전",
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          //  return navigation.replace("LoginScreen");
          console.log("no token");
        }
        const response = await axios.get(`${API_URL}/ai/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          const apiData = response.data.result;

          // 데이터 구조 변환: API에서 받은 데이터를 `data` 배열에 맞게 변환
          const formattedData = [
            { count: apiData.lastTrained, number: 0 }, // 학습 일자
            { count: apiData.performanceImprovemnt ?? "0%" }, // 성능 향상률
            { count: apiData.version, number: 0 }, // 버전
          ];
          setData(formattedData);
          console.log(apiData);
        } else {
          // setCachedData([]);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    getDatas();
  }, []);

  return (
    <Wrapper>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Quantity
            key={index}
            title={titles[index]}
            count={item?.count}
            number={item?.number}
          />
        ))
      ) : (
        <p>로딩 중...</p> // 데이터가 로딩 중일 때 표시할 메시지
      )}
    </Wrapper>
  );
};

export default QunatityManage;
