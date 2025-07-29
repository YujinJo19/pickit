import React from "react";
import Input from "../ui/Input";
import Button, { StyledButton } from "../ui/Button";
import styled from "styled-components";
import { StyledLoginForm } from "./LoginForm";

interface Props {
  onSubmit: (e: any) => void;
  dispatchEmailCheck: () => void;
  dispatchCodeSend: () => void;
  dispatchCodeVerify: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setAuthCode: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  isEmailDuplicated: boolean;
  isCodeSent: boolean;
  isCodeVerified: boolean;
}

const IinputButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const StyledCheckButton = styled.button`
  padding: 12px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  width: auto;

  &:hover {
    background-color: #333;
  }
`;

const SignupForm = ({
  onSubmit,
  dispatchEmailCheck,
  dispatchCodeSend,
  dispatchCodeVerify,
  setName,
  setEmail,
  setAuthCode,
  setPhoneNumber,
  setPassword,
  setPassword2,
  isEmailDuplicated,
  isCodeSent,
  isCodeVerified,
}: Props) => {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>회원가입</h2>
      <div>
        <Input label="이름" setName={setName} name="name" />
        {isEmailDuplicated ? (
          <IinputButtonContainer>
            <div>
              <Input label="이메일" setEmail={setEmail} name="email" />
            </div>
            <StyledCheckButton onClick={dispatchEmailCheck}>
              중복확인
            </StyledCheckButton>
          </IinputButtonContainer>
        ) : isCodeSent ? (
          <IinputButtonContainer>
            <div>
              <Input label="인증코드" setAuthCode={setAuthCode} name="code" />
            </div>
            <StyledCheckButton onClick={dispatchCodeVerify}>
              코드확인
            </StyledCheckButton>
          </IinputButtonContainer>
        ) : (
          <IinputButtonContainer>
            <div>
              <Input label="이메일" name="email" />
            </div>
            <StyledCheckButton onClick={dispatchCodeSend}>
              코드전송
            </StyledCheckButton>
          </IinputButtonContainer>
        )}
        <div>
          <Input label="인증번호" setEmail={setAuthCode} name="code" />
        </div>
        <Input
          label="전화번호"
          setPhoneNumber={setPhoneNumber}
          name="phoneNumber"
        />
        <Input label="비밀번호" setPassword={setPassword} name="password" />
        <Input
          label="비밀번호 확인"
          setPassword2={setPassword2}
          name="password2"
        />
        <Input
          label="이용약관에 모두 동의합니다"
          type="checkbox"
          name="checkbox"
        />
        <Button contents="회원가입" onSubmit={onSubmit} />
      </div>
    </StyledLoginForm>
  );
};

export default SignupForm;
