import React from "react";
import Logo from "./Logo";
import NotificationBell from "./NotificationBell";
import { styled } from "styled-components";
import Avatar from "./Avatar";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 64px;
  padding: 0 24px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    height: 56px;
    padding: 0 16px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

const SellerHeader = () => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo />
      </HeaderLeft>

      <HeaderRight>
        <NotificationBell />
        <Avatar />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default SellerHeader;
