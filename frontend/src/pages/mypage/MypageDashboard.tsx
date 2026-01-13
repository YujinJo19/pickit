import React, { useEffect } from "react";
import ProfileSummaryCard from "../../components/mypage/ProfileSummaryCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getToken, getUserIdFromToken } from "../../utils/token";
import { getUser } from "../../store/thunks/userThunk";

const MypageDashboard = () => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const userId = token ? getUserIdFromToken(token) : 0;

  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId, user]);

  if (loading) return <div>로딩중...</div>;
  if (!user) return null;
  return (
    <div>
      <ProfileSummaryCard
        nickname={user.nickname}
        email={user.email}
        imageUrl={user.profileImageUrl}
        userId={user.id}
      />
    </div>
  );
};

export default MypageDashboard;
