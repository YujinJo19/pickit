import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";
import { StyledLoginForm } from "./LoginForm";

interface Props {
  onSubmit: (e: any) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setAuthCode: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
}

const SignupForm = ({
  onSubmit,
  setName,
  setEmail,
  setAuthCode,
  setPhoneNumber,
  setPassword,
  setPassword2,
}: Props) => {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>회원가입</h2>
      <div>
        <Input label="이름" setName={setName} />
        <div>
          <Input label="이메일" setEmail={setEmail} />
        </div>
        <div>
          <Input label="인증번호" setEmail={setAuthCode} />
        </div>
        <Input label="전화번호" setPhoneNumber={setPhoneNumber} />
        <Input label="비밀번호" setPassword={setPassword} />
        <Input label="비밀번호 확인" setPassword2={setPassword2} />
        <Input label="이용약관에 모두 동의합니다" type="checkbox" />
        <Button contents="회원가입" onSubmit={onSubmit} />
      </div>
    </StyledLoginForm>
  );
};

export default SignupForm;
