import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Quantity from "./Quantity";
// import axios from "axios";
// const API_URL = process.env.REACT_APP_API_URL;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  min-width: 800px;
  margin-bottom: 20px;
`;
const QunatityManage = () => {
  const titles = [
    "이용자 수",
    "등록카페 수",
    "쿠폰 수",
    "오늘 접속자 수",
    "누적 접속자 수",
  ];
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const getDatas = async () => {
  // console.log("요청 URL:", `${API_URL}/manage`);
  // console.log("요청 헤더:", {
  //   Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aW5uZXJqaXdvb0BnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzM2NTc1NDIwfQ.TbsHmRPq4KYgFIicBCSBOgeUOLQUSqHvwfkZ4nuXhIo`}`,
  // });

  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         //  return navigation.replace("LoginScreen");
  //         console.log("no token");
  //       }
  //       const response = await axios.get(`${API_URL}/manage`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(response.data.data);
  //       if (response.data.code == 200) {
  //         // setKey(new Date().getTime());
  //         const apiData = response.data.data;

  //         // 데이터 구조 변환: API에서 받은 데이터를 `data` 배열에 맞게 변환
  //         const formattedData = [
  //           { count: apiData.userCount, number: 0 }, // 가입자 수
  //           { count: apiData.noteCount, number: 0 }, // 게시물 수
  //           { count: apiData.bookCount, number: 0 }, // 도서 수
  //           { count: apiData.todayVisitorCount, number: 0 }, // 오늘 접속자 수
  //           { count: apiData.totalVisitorCount, number: 0 }, // 누적 접속자 수
  //         ];
  //         setData(formattedData);
  //       } else {
  //         // setCachedData([]);
  //       }
  //     } catch (error) {
  //       console.error("에러 발생:", error);
  //     }
  //   };
  //   getDatas();
  // }, []);

  const data = [
    { count: 100, number: 5 },
    { count: 100, number: -5 },
    { count: 90, number: 3 },
    { count: 150, number: 50 },
    { count: 200, number: 50 },
  ]; // 이부분만 추후에 백에서 받아오게 바꾸면됨.
  // count가 숫자고, number가 증감값임.

  return (
    <Wrapper>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Quantity
            key={index}
            title={titles[index]}
            count={item.count}
            number={item.number}
          />
        ))
      ) : (
        <p>로딩 중...</p> // 데이터가 로딩 중일 때 표시할 메시지
      )}
    </Wrapper>
  );
};

export default QunatityManage;
