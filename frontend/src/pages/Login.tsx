import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import { styled, css } from "styled-components";
import LoginImage from "../assets/images/login.jpg";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const LoginImageContainer = styled.div`
  min-width: 50px;
  width: 50%;
  height: 100%;
  ${({ theme }) => css`
    @media ${theme.breakpoints.mobile} {
      display: none; // 모바일 화면에서만 숨김
    }
  `}
`;

const LoginFormContainer = styled.div`
  width: 50%;
  height: 50%;
  ${({ theme }) => css`
    @media ${theme.breakpoints.mobile} {
      width: 80%;
      min-width: 300px;
    }
  `}
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit= (e: any)=>{
    e.preventDefault()
    console.log('email=>', email,'password=>', password)
  }
  return (
    <LoginPageContainer>
      <LoginImageContainer>
        <img src={LoginImage} width={"100%"} alt="loginImage" />
      </LoginImageContainer>
      <LoginFormContainer>
        <LoginForm setEmail={setEmail} setPassword={setPassword} onSubmit={onSubmit} />
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default Login;
