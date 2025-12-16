import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { decodeToken, getToken, removeToken } from "../utils/token";
import Header from "../components/layout/header/Header";

const Main = () => {
  const [userInfo, setUserInfo] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response.meta.requestStatus === "fulfilled") {
      removeToken();
      console.log("로그아웃됨");
      navigate("/");
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
    <>
      <Header userInfo={userInfo} onLogout={handleLogout} />
    </>
  );
};

export default Main;
