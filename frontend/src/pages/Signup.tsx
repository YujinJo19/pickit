import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import SignupImage from "../assets/images/signup.png";
import {
  AuthFormContainer,
  AuthImageContainer,
  AuthPageContainer,
} from "./Login";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={SignupImage} width={"100%"} alt="SignupImage" />
      </AuthImageContainer>
      <AuthFormContainer>
        <SignupForm
          onSubmit={onSubmit}
          setName={setName}
          setEmail={setEmail}
          setAuthCode={setAuthCode}
          setPhoneNumber={setPhoneNumber}
          setPassword={setPassword}
          setPassword2={setPassword2}
        />
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default Signup;
