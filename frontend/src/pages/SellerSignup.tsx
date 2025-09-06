import React from "react";
import {
  AuthFormContainer,
  AuthImageContainer,
  AuthPageContainer,
} from "./Login";
import SignupImage from "../assets/images/signup.png";

const SellerSignup = () => {
  return (
    <AuthPageContainer>
      <AuthImageContainer>
        <img src={SignupImage} width={"100%"} alt="SignupImage" />
      </AuthImageContainer>
      <AuthFormContainer>회원가입 폼</AuthFormContainer>
    </AuthPageContainer>
  );
};

export default SellerSignup;
