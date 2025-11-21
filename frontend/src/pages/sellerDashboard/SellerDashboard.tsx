import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerHeader from "../../components/seller/header/SellerHeader";
import SellerSidebar from "../../components/seller/SellerSidebar";
import { styled } from "styled-components";
import { Menu } from "lucide-react";

interface SidebarProps {
  $open: boolean;
}

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Container>
        <HeaderWrapper>
          <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </MobileMenuButton>
          <SellerHeader />
        </HeaderWrapper>
        <ContentWrapper>
          <SidebarWrapper $open={sidebarOpen}>
            <SellerSidebar />
          </SidebarWrapper>
          {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}
          <MainContent>
            <Outlet />
          </MainContent>
        </ContentWrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  height: 60px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;

  @media (max-width: 768px) {
    display: block;
    margin-right: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f9fafb;
  position: relative;
`;

const SidebarWrapper = styled.div<SidebarProps>`
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100% - 60px);
    z-index: 1000;
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const Overlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background: rgba(0, 0, 0, 0.3);
    z-index: 500;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export default SellerDashboard;
