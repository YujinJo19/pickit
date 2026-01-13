import React from "react";
import Input from "../ui/Input";
import Button, { StyledButton } from "../ui/Button";
import { StyledLoginForm } from "./LoginForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import EmailVerification, { EmailVerificationForm } from "./EmailVerification";
import { SellerFormData } from "../../types/seller";

export interface SellerSignupProps {
  onSubmit?: (e: any) => void;
  register: UseFormRegister<SellerFormData>;
  errors: FieldErrors<{
    storeName: string;
    storeAddress: string;
    businessNumber: string;
    name: string;
    email: string;
    code: string;
    password: string;
    password2: string;
    phoneNumber: string;
    agreeTerms: string;
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

const SellerSignupForm = ({
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
}: SellerSignupProps) => {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h2>판매자 회원가입</h2>
      <div>
        <Input
          label="이름"
          field={register("name")}
          error={errors.name?.message}
        />
        <EmailVerification
          register={
            register as unknown as UseFormRegister<EmailVerificationForm>
          }
          errors={errors as FieldErrors<EmailVerificationForm>}
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
        />
        <Input
          label="판매자명"
          field={register("storeName")}
          error={errors.storeName?.message}
        />
        <Input
          label="사업장 주소"
          field={register("storeAddress")}
          error={errors.storeAddress?.message}
        />
        <Input
          label="사업장번호"
          field={register("businessNumber")}
          error={errors.businessNumber?.message}
        />
        <Input
          label="비밀번호"
          field={register("password")}
          error={errors.password?.message}
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
          type="password"
        />
        <Input
          label="이용약관에 모두 동의합니다"
          type="checkbox"
          field={register("agreeTerms")}
          error={errors.agreeTerms?.message}
        />
        <Button contents="회원가입" type="submit" />
      </div>
    </StyledLoginForm>
  );
};

export default SellerSignupForm;
