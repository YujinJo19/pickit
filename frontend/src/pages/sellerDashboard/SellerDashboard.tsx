import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SellerHeader from "../../components/seller/header/SellerHeader";
import SellerSidebar from "../../components/seller/SellerSidebar";
import { styled } from "styled-components";

const SellerDashboard = () => {
  return (
    <>
      <Container>
        <HeaderWrapper>
          <SellerHeader />
        </HeaderWrapper>
        <ContentWrapper>
          <SidebarWrapper>
            <SellerSidebar />
          </SidebarWrapper>
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f9fafb;
`;

const SidebarWrapper = styled.div`
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export default SellerDashboard;
