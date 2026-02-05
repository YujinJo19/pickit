import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import MypageSidebar from "../../mypage/MypageSidebar";
import styled from "styled-components";
import { useState } from "react";

const MypageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return (
    <>
      <DesktopOnly>
        <Header />
      </DesktopOnly>

      <MobileHeader>
        <Hamburger onClick={() => setSidebarOpen(true)}>☰</Hamburger>
        <Title>마이페이지</Title>
      </MobileHeader>

      {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}

      <SidebarWrapper $open={sidebarOpen}>
        <MypageSidebar onClose={() => setSidebarOpen(false)} />
      </SidebarWrapper>
      <Wrapper>
        <DesktopSidebar>
          <MypageSidebar />
        </DesktopSidebar>

        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
};

export default MypageLayout;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 40px 12px 12px;
    display: block;
  }
`;

const DesktopSidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarWrapper = styled.aside<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding-top: 30px;
    background: #fff;
    z-index: 1100;
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 980px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
    width: 100%;
  }
`;

const Hamburger = styled.button`
  width: 40px;
  height: 40px;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    opacity: 0.6;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const MobileHeader = styled.div`
  display: none;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  height: 48px;
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 1002;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
`;
