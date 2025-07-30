import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import SignupImage from "../assets/images/signup.png";
import {
  AuthFormContainer,
  AuthImageContainer,
  AuthPageContainer,
} from "./Login";
import { useAppDispatch } from "../store/hooks";
import {
  signup,
  emailCheck,
  sendCode,
  verifyCode,
} from "../store/thunks/authThunk";
import { useSignupForm } from "../components/auth/hooks/useSignupForm";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useSignupForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(true);
  const [authCode, setAuthCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setisCodeVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isCodeVerified) {
      console.log("회원가입 요청보내기");
    } else {
      setErrorMessage("이메일 인증이 완료되지 않았습니다.");
      // return errorMessage;
    }
    if (password !== password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");

      // return errorMessage;
    }
    const data = {
      email: email,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
    };
    dispatch(signup({ data })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        console.log("회원가입 성공");
      } else {
        console.log("회원가입 실패");
      }
    });
  };

  const dispatch = useAppDispatch();

  const onValid = async (data: any) => {
    const { email, code, password, name } = data;

    // 회원가입 요청
    const signupRes = await dispatch(
      signup({
        data: {
          email,
          password,
          name,
          phoneNumber,
        },
      })
    );
    if (signupRes.meta.requestStatus === "fulfilled") {
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
    }
  };

  // 인증코드 확인
  const dispatchCodeVerify = async () => {
    const code = watch("code");
    const res = await dispatch(verifyCode({ email, code }));
    if (res.meta.requestStatus !== "fulfilled") {
      setError("code", { message: "인증코드가 올바르지 않습니다" });
      return;
    }
  };

  // 인증코드 보내기
  const dispatchCodeSend = async () => {
    const email = watch("email");
    await dispatch(sendCode({ email }));
  };
  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={SignupImage} width={"100%"} alt="SignupImage" />
      </AuthImageContainer>
      <AuthFormContainer>
        <SignupForm
          onSubmit={onSubmit}
          dispatchEmailCheck={dispatchEmailCheck}
          dispatchCodeSend={dispatchCodeSend}
          dispatchCodeVerify={dispatchCodeVerify}
          setName={setName}
          setEmail={setEmail}
          setAuthCode={setAuthCode}
          setPhoneNumber={setPhoneNumber}
          setPassword={setPassword}
          setPassword2={setPassword2}
          isEmailDuplicated={isEmailDuplicated}
          isCodeSent={isCodeSent}
          isCodeVerified={isCodeVerified}
        />
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default Signup;
