import React, { useState } from "react";
import {
  AuthFormContainer,
  AuthImageContainer,
  AuthPageContainer,
} from "./Login";
import SignupImage from "../assets/images/signup.png";
import SellerSignupForm from "../components/auth/SellerSignupForm";
import { useSellerSignupForm } from "../components/auth/hooks/useSignupForm";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import useEmailTimer from "../components/auth/hooks/useEmailTimer";
import {
  signup,
  emailCheck,
  sendCode,
  verifyCode,
} from "../store/thunks/authThunk";

const SellerSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useSellerSignupForm();
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setisCodeVerified] = useState(false);
  const [sendCount, setSendCount] = useState(0);
  const password = watch("password");
  const MAX_SEND_COUNT = 5;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formatTime, isExpired, startTimer, resetTimer } = useEmailTimer();

  const onValid = async (data: any) => {
    const {
      email,
      password,
      name,
      phoneNumber,
      storeName,
      storeAddress,
      businessNumber,
    } = data;
    if (!isCodeVerified) {
      setError("code", { message: "이메일 인증이 필요합니다." });
      return;
    }

    // 회원가입 요청
    const signupRes = await dispatch(
      signup({
        data: {
          email,
          password,
          name,
          phoneNumber,
          storeName,
          storeAddress,
          businessNumber,
          role: "SELLER",
        },
      })
    );
    if (signupRes.meta.requestStatus === "fulfilled") {
      navigate("/");
      console.log("회원가입 성공");
    } else {
      console.log("회원가입 실패");
    }
  };

  // 이메일 중복 확인
  const dispatchEmailCheck = async () => {
    const email = watch("email");

    const res = await dispatch(emailCheck(email));
    if (res.meta.requestStatus !== "fulfilled") {
      setError("email", { message: "이미 사용 중인 이메일입니다" });
    } else {
      setIsEmailDuplicated(false);
      alert("사용가능한 이메일입니다.");
    }
  };

  // 인증코드 보내기
  const dispatchCodeSend = async () => {
    if (sendCount >= MAX_SEND_COUNT) {
      alert("인증 코드 전송은 하루 5회로 제한됩니다");
      return;
    }
    const email = watch("email");
    await dispatch(sendCode({ email }));
    setIsCodeSent(true);
    startTimer();
    setSendCount((prev) => prev + 1);
  };

  // 인증코드 확인
  const dispatchCodeVerify = async () => {
    const code = watch("code");
    const email = watch("email");

    const res = await dispatch(verifyCode({ email, code }));
    if (res.meta.requestStatus !== "fulfilled") {
      setError("code", { message: "인증코드가 올바르지 않습니다" });
      return;
    }
    setisCodeVerified(true);
    resetTimer();
  };

  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={SignupImage} width={"100%"} alt="SignupImage" />
      </AuthImageContainer>
      <AuthFormContainer>
        <SellerSignupForm
          onSubmit={handleSubmit(onValid)}
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
          password={password}
        />
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default SellerSignup;
