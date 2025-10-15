import React from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick = async () => {
    const response = await dispatch(logout());
    if (response.meta.requestStatus === "fulfilled") {
      removeToken();
      console.log(response);
      navigate("/");
    }
  };
  return (
    <>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
};

export default Main;
