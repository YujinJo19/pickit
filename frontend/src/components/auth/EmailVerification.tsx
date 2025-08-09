import React, { useState } from "react";
import { SignupProps } from "./SignupForm";
import { styled } from "styled-components";
import Input from "../ui/Input";

const InputButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StyledCheckButton = styled.button`
  padding: 12px 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #333;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margintop: 4px;
`;

const EmailVerification = ({
  register,
  errors,
  dispatchEmailCheck,
  dispatchCodeSend,
  dispatchCodeVerify,
  isEmailDuplicated,
  isCodeSent,
  isCodeVerified,
  formatTime,
  isExpired,
}: SignupProps) => {
  if (isEmailDuplicated) {
    return (
      <>
        <InputButtonContainer>
          <Input label="이메일" field={register("email")} name="email" />
          <StyledCheckButton type="button" onClick={dispatchEmailCheck}>
            중복확인
          </StyledCheckButton>
        </InputButtonContainer>
        {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
      </>
    );
  }

  if (!isCodeSent) {
    return (
      <>
        <InputButtonContainer>
          <Input label="이메일" field={register("email")} name="email" />
          <StyledCheckButton type="button" onClick={dispatchCodeSend}>
            코드전송
          </StyledCheckButton>
        </InputButtonContainer>
        {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
      </>
    );
  }
  if (!isCodeVerified) {
    return (
      <>
        <Input
          label="이메일"
          field={register("email")}
          name="email"
          readOnly={isCodeSent}
        />
        <>
          <InputButtonContainer>
            <Input label="인증코드" field={register("code")} name="code" />
            <StyledCheckButton
              type="button"
              onClick={dispatchCodeVerify}
              disabled={isExpired}
            >
              코드확인
            </StyledCheckButton>
          </InputButtonContainer>
          {!isExpired && !isCodeVerified && (
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "5px",
                color: "red",
              }}
            >
              {formatTime()}
            </div>
          )}
          {isExpired && !isCodeVerified && (
            <ErrorMessage>
              인증 시간이 만료되었습니다. 다시 요청해주세요.
            </ErrorMessage>
          )}
          {errors && <ErrorMessage>{errors.code?.message}</ErrorMessage>}
        </>
      </>
    );
  }
  return (
    <Input
      label="이메일"
      field={register("email")}
      error={errors.email?.message}
      name="email"
    />
  );
};

export default EmailVerification;
