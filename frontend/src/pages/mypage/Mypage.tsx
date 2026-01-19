import React, { useEffect, useState } from "react";
import ProfilePage from "./MypageDashboard";
import { Outlet, useNavigate } from "react-router-dom";
import MypageSidebar from "../../components/mypage/MypageSidebar";
import Header from "../../components/layout/header/Header";
import { decodeToken, getToken, removeToken } from "../../utils/token";
import { logout } from "../../store/thunks/authThunk";
import { getProduct } from "../../store/thunks/productThunk";
import { useAppDispatch } from "../../store/hooks";
import styled from "styled-components";

const Mypage = () => {
  const [userInfo, setUserInfo] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response.meta.requestStatus === "fulfilled") {
      removeToken();
      console.log("로그아웃됨");
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const info = decodeToken(token);
      setUserInfo(info?.sub ? info.sub : "");
    }
  }, [userInfo]);
  return (
    <Page>
      <Header userInfo={userInfo} onLogout={handleLogout} />
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
