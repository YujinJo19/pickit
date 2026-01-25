import React from "react";
import { Outlet } from "react-router-dom";
import MypageSidebar from "../../components/mypage/MypageSidebar";
import Header from "../../components/layout/header/Header";
import styled from "styled-components";

const Mypage = () => {
  return (
    <Page>
      <Header />
      <Container>
        <MypageSidebar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </Container>
    </Page>
  );
};

export default Mypage;

const Page = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
`;
