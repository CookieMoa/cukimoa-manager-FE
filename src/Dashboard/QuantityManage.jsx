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
  min-width: 800px;
  margin-bottom: 20px;
`;
const QunatityManage = () => {
  const titles = [
    "가입자 수",
    "등록카페 수",
    "발급 쿠폰 수",
    "사용 쿠폰 수",
    "쿠폰 사용율",
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
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          // setKey(new Date().getTime());
          const apiData = response.data.result;
          // setData(apiData);

          // 데이터 구조 변환: API에서 받은 데이터를 `data` 배열에 맞게 변환
          const formattedData = [
            { count: apiData.customerCount, number: 0 }, // 손님수
            { count: apiData.cafeCount, number: 0 }, // 카페수
            { count: apiData.issuedCouponCount, number: 0 }, // 발급된 쿠폰수
            { count: apiData.usedCouponCount, number: 0 }, // 사용된 쿠폰수
            { count: apiData.couponUsageRate, number: 0 }, // 쿠폰 사용률
          ];
          setData(formattedData);
          console.log(data);
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
