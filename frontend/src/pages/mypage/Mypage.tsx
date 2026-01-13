import React from "react";
import ProfilePage from "./MypageDashboard";
import { Outlet } from "react-router-dom";
import MypageSidebar from "../../components/mypage/MypageSidebar";

const Mypage = () => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <MypageSidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Mypage;
