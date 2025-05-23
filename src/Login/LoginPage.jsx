import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e1d3c1;
  flex-direction: column;
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: 450px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  background-color: #fff;
  position: relative; /* CenterLine 기준 */
`;

const CukimoaLogo = styled.img`
  width: 300px;
  margin-bottom: 25px;
`;
const Inputbox = styled.input`
  width: 295px;
  height: 47px;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: none;
  color: #797777;
  font-size: 18px;
  padding-left: 13px;

  &:focus {
    outline: none; /* 기본 파란 테두리 제거 */
    box-shadow: 0 0 0 2px #95765855; /* 부드러운 갈색 그림자 */
    background-color: #f0f0f0;
  }
`;
const LoginButton = styled.button`
  background-color: #957658;
  border-radius: 100px;
  width: 150px;
  height: 47px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;

  &:active {
    background-color: #7a5e45; /* 눌렸을 때 좀 더 어두운 톤 */
    transform: scale(0.98); /* 살짝 눌리는 느낌 */
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const CafeImg = styled.img`
  width: 380px;
`;
const LoginTitle = styled.div`
  color: #957658;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const MainTitle = styled.div`
  color: #fdf6ee;
  font-size: 28px;
  font-weight: 900;
`;

const CenterLine = styled.div`
  width: 0.1px;
  height: 90%;
  background-color: #bcbcbc;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log("함수실행됨");
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: username,
        password: password,
      });

      if (response.data.code == "COMMON200") {
        console.log(response);
        const { access, userId } = response.data.result;
        localStorage.setItem("userId", userId);
        localStorage.setItem("accessToken", access);
        navigate("/");
      } else if (response.data.code === 404) {
        setError("이메일을 확인하세요.");
      } else if (response.data.code === 401) {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("네트워크를 확인해주세요.");
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <MainTitle>관리자 페이지</MainTitle>
        <CukimoaLogo src="/images/mainlogo.svg" />
      </HeaderContainer>
      <LoginForm>
        <LeftContainer>
          <CafeImg src="/images/mainimg.webp" />
        </LeftContainer>
        <CenterLine />
        <RightContainer>
          {/**/}
          <LoginTitle>관리자 로그인 페이지</LoginTitle>
          <Inputbox
            placeholder="ID"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Inputbox>
          <Inputbox
            placeholder="PW"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Inputbox>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </RightContainer>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
