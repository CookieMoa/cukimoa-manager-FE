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
`;
const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 470px;
  height: 390px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  gap: 15px;
`;

const CukimoaLogo = styled.img`
  width: 230px;
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

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      console.log("ㄴㅁㅇㄹ");
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.code === 200) {
        console.log(response);
        // const token = response.data.data.accessToken;
        // const userId = response.data.data.userId;
        // Save to localStorage
        // localStorage.setItem("userId", userId);
        // localStorage.setItem("accessToken", token);
        // localStorage.setItem("token", token);
        // // Redirect to AdminHome
        // navigate("/home");
        // } else if (response.data.code === 404) {
        //   setError("이메일을 확인하세요.");
        // } else if (response.data.code === 401) {
        //   setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("네트워크를 확인해주세요.");
    }
  };

  return (
    <Container>
      <LoginForm>
        <CukimoaLogo src="/images/mainlogo.svg" />
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
        <LoginButton onClick={handleLogin}>로그인ㅇ</LoginButton>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
