import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { getUser } from "../store/thunks/authThunk";

const Main = () => {
  const dispatch = useAppDispatch();
  const onClick = async () => {
    const response = await dispatch(getUser(2));
    if (response.meta.requestStatus === "fulfilled") {
      console.log(response);
    }
  };
  return (
    <>
      <button onClick={onClick}>유저 정보 불러오기</button>
    </>
  );
};

export default Main;
