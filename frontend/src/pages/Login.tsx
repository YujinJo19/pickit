import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import { styled, css } from "styled-components";
import LoginImage from "../assets/images/login.jpg";
import { login } from "../store/thunks/authThunk";
import { useAppDispatch } from "../store/hooks";

export const AuthPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const AuthImageContainer = styled.div`
  min-width: 50px;
  width: 50%;
  height: 100%;
  ${({ theme }) => css`
    @media ${theme.breakpoints.mobile} {
      display: none; // 모바일 화면에서만 숨김
    }
  `}
`;

export const AuthFormContainer = styled.div`
  width: 50%;
  // height: 50%;
  ${({ theme }) => css`
    @media ${theme.breakpoints.mobile} {
      width: 80%;
      min-width: 300px;
    }
  `}
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLoginFlag, setAutoLoginFlag] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = { email: email, password: password };
    dispatch(login(data));
  };
  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={LoginImage} width={"100%"} alt="loginImage" />
      </AuthImageContainer>
      <AuthFormContainer>
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          setAutoLoginFlag={setAutoLoginFlag}
          onSubmit={onSubmit}
        />
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default Login;
