import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextButton from "../ui/TextButton";
import { styled } from "styled-components";

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit:(e:any)=>void
}

const StyledLoginForm = styled.form`
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


const LoginForm = ({setEmail, setPassword, onSubmit}: Props) => {
  
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>환영합니다!</h2>
      <p>Pick It에 오신 것을 환영합니다! 로그인 후 즐거운 쇼핑을 시작하세요.</p>
      <div>
        <div>
          <Input label="아이디" setEmail={setEmail}  />
          <Input label="비밀번호"  setPassword={setPassword} />
        </div>
        <StyledCheckboxContainer>
          {/* <Input label="자동로그인" type="checkbox" setInputValue={setInputValue} /> */}
          <TextButton>비밀번호 찾기</TextButton>
        </StyledCheckboxContainer>
        <Button contents="로그인" onSubmit={onSubmit} />
        {/* <Button contents="회원가입" /> */}
      </div>
      <TextButton>판매자로 가입</TextButton>
    </StyledLoginForm>
  );
};

export default LoginForm;
