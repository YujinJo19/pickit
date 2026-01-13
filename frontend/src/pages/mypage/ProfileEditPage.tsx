import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileForm from "../../components/mypage/ProfileForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getToken, getUserIdFromToken } from "../../utils/token";
import { deleteUser, getUser } from "../../store/thunks/userThunk";
import { logout } from "../../store/thunks/authThunk";

const ProfileEditPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const userId = token ? getUserIdFromToken(token) : 0;

  const { user, loading, error } = useAppSelector((state) => state.auth);
  const handleDelete = async () => {
    const ok = window.confirm(
      "회원 탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다."
    );
    if (!ok) return;

    const res = await dispatch(deleteUser(userId));
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(logout());
      navigate("/");
    }
  };
  useEffect(() => {
    if (!user && userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId, user]);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>프로필 정보를 불러올 수 없습니다.</div>;
  if (!user) return null;
  return (
    <div>
      <h2>프로필 관리</h2>
      <ProfileForm user={user} />
      <StyledButton onClick={handleDelete}>회원탈퇴</StyledButton>
    </div>
  );
};

export default ProfileEditPage;

const StyledButton = styled.button`
  padding: 12px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin: 10px 0;
  width: 100%;

  &:hover {
    background-color: rgba(241, 16, 16);
  }
`;
