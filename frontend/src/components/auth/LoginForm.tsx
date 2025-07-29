import React, { useState } from "react";
import Button, { StyledButton } from "../ui/Button";
import Input from "../ui/Input";
import TextButton from "../ui/TextButton";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setAutoLoginFlag: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: any) => void;
}

export const StyledLoginForm = styled.form`
  padding: 12px 20px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin: 0;
`;

const StyledCheckboxContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginForm = ({
  setEmail,
  setPassword,
  setAutoLoginFlag,
  onSubmit,
}: Props) => {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>환영합니다!</h2>
      <p>Pick It에 오신 것을 환영합니다! 로그인 후 즐거운 쇼핑을 시작하세요.</p>
      <div>
        <div>
          <Input label="아이디" setEmail={setEmail} name="email" />
          <Input label="비밀번호" setPassword={setPassword} name="password" />
        </div>
        <StyledCheckboxContainer>
          <Input
            label="자동로그인"
            type="checkbox"
            name="checkbox"
            setAutoLoginFlag={setAutoLoginFlag}
          />
          <TextButton>비밀번호 찾기</TextButton>
        </StyledCheckboxContainer>
        <Button contents="로그인" onSubmit={onSubmit} />
        <StyledButton>
          <Link to="/signup">회원가입</Link>
        </StyledButton>
      </div>
      <TextButton>판매자로 가입</TextButton>
    </StyledLoginForm>
  );
};

export default LoginForm;
