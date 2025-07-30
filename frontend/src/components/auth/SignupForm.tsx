import React from "react";
import Input from "../ui/Input";
import Button, { StyledButton } from "../ui/Button";
import styled from "styled-components";
import { StyledLoginForm } from "./LoginForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onSubmit: (e: any) => void;
  register: UseFormRegister<{
    name: string;
    email: string;
    code: string;
    password: string;
    password2: string;
    phoneNumber: string;
  }>;
  errors: FieldErrors<{
    name: string;
    email: string;
    code: string;
    password: string;
    password2: string;
    phoneNumber: string;
  }>;
  dispatchEmailCheck: () => void;
  dispatchCodeSend: () => void;
  dispatchCodeVerify: () => void;
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
  register,
  errors,
  dispatchEmailCheck,
  dispatchCodeSend,
  dispatchCodeVerify,
  isEmailDuplicated,
  isCodeSent,
  isCodeVerified,
}: Props) => {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>회원가입</h2>
      <div>
        <Input
          label="이름"
          field={register("name")}
          error={errors.name?.message}
          name={"name"}
        />
        {isEmailDuplicated ? (
          <IinputButtonContainer>
            <div>
              <Input
                label="이메일"
                field={register("email")}
                error={errors.email?.message}
                name={"email"}
              />
            </div>
            <StyledCheckButton onClick={dispatchEmailCheck}>
              중복확인
            </StyledCheckButton>
          </IinputButtonContainer>
        ) : isCodeSent ? (
          <IinputButtonContainer>
            <div>
              <Input
                label="인증코드"
                field={register("code")}
                error={errors.code?.message}
                name={"code"}
              />
            </div>
            <StyledCheckButton onClick={dispatchCodeVerify}>
              코드확인
            </StyledCheckButton>
          </IinputButtonContainer>
        ) : (
          <IinputButtonContainer>
            <div>
              <Input
                label="이메일"
                field={register("email")}
                error={errors.email?.message}
                name={"email"}
              />
            </div>
            <StyledCheckButton onClick={dispatchCodeSend}>
              코드전송
            </StyledCheckButton>
          </IinputButtonContainer>
        )}
        <Input
          label="전화번호"
          field={register("phoneNumber")}
          error={errors.phoneNumber?.message}
          name={"phoneNumber"}
        />
        <Input
          label="비밀번호"
          field={register("password")}
          error={errors.password?.message}
          name={"password"}
        />
        <Input
          label="비밀번호 확인"
          field={register("password2")}
          error={errors.password2?.message}
          name={"password2"}
        />
        <Input
          label="이용약관에 모두 동의합니다"
          type="checkbox"
          name={"checkbox"}
        />
        <Button contents="회원가입" onSubmit={onSubmit} />
      </div>
    </StyledLoginForm>
  );
};

export default SignupForm;
