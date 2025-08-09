import React from "react";
import Input from "../ui/Input";
import Button, { StyledButton } from "../ui/Button";
import { StyledLoginForm } from "./LoginForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import EmailVerification from "./EmailVerification";

export interface SignupProps {
  onSubmit?: (e: any) => void;
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
  formatTime: () => string;
  isExpired: boolean;
  password?: string;
}

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
  formatTime,
  isExpired,
  password,
}: SignupProps) => {
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
        <EmailVerification
          register={register}
          errors={errors}
          dispatchEmailCheck={dispatchEmailCheck}
          dispatchCodeSend={dispatchCodeSend}
          dispatchCodeVerify={dispatchCodeVerify}
          isEmailDuplicated={isEmailDuplicated}
          isCodeSent={isCodeSent}
          isCodeVerified={isCodeVerified}
          formatTime={formatTime}
          isExpired={isExpired}
        />
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
          type="password"
        />
        <Input
          label="비밀번호 확인"
          field={register("password2", {
            required: "비밀번호 확인은 필수 입력값입니다.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          error={errors.password2?.message}
          name={"password2"}
          type="password"
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
