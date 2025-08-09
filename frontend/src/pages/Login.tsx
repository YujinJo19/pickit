import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import { styled, css } from "styled-components";
import LoginImage from "../assets/images/login.jpg";
import { login } from "../store/thunks/authThunk";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../components/auth/hooks/useSignupForm";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useLoginForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLoginFlag, setAutoLoginFlag] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onValid = async (data: any) => {
    const { email, password } = data;
    const loginData = { email: email, password: password };
    const loginRes = await dispatch(login(loginData));
    if (loginRes.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };
  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={LoginImage} width={"100%"} alt="loginImage" />
      </AuthImageContainer>
      <AuthFormContainer>
        <LoginForm
          onSubmit={handleSubmit(onValid)}
          register={register}
          errors={errors}
        />
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default Login;
