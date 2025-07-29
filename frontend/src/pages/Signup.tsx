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
  authCodeSend,
  authCodeVerify,
  authEmailCheck,
  signup,
} from "../store/slices/authSlice";

const Signup = () => {
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

  const dispatchEmailCheck = () => {
    dispatch(authEmailCheck(email)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsEmailDuplicated(false);
      } else {
        setIsEmailDuplicated(true);
      }
    });
  };

  const dispatchCodeSend = () => {
    dispatch(authCodeSend({ email: email })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsCodeSent(true);
      } else {
        setIsCodeSent(false);
      }
    });
  };

  const dispatchCodeVerify = () => {
    dispatch(authCodeVerify({ email: email, code: authCode })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          setisCodeVerified(true);
        } else {
          setisCodeVerified(false);
        }
      }
    );
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
