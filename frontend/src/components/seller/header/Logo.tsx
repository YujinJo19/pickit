import React from "react";
import logo_img from "../../../assets/images/logo_image.jpeg";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  img {
    width: 28px;
    height: 28px;
  }
`;
const Logo = () => {
  const navigate = useNavigate();
  return (
    <StyledLogo onClick={() => navigate("/seller/dashboard")}>
      <img src={logo_img} alt="Pickit Logo" />
    </StyledLogo>
  );
};

export default Logo;
