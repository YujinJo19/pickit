import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import ProfileImageUploader from "./ProfileImageUploader";

interface ProfileSummaryCardProps {
  nickname: string;
  userId: number;
  email: string;
  imageUrl?: string;
}

const ProfileSummaryCard = ({
  nickname,
  userId,
  email,
  imageUrl,
}: ProfileSummaryCardProps) => {
  return (
    <Card>
      <ProfileRow>
        <ProfileInfo>
          <EmailText>{email}</EmailText>
          <EmailText>{nickname}</EmailText>

          <Link to="/mypage/profile/edit">
            <EditButton>회원정보 수정</EditButton>
          </Link>
        </ProfileInfo>

        <ProfileImageUploader userId={userId} imageUrl={imageUrl} />
      </ProfileRow>
    </Card>
  );
};

export default ProfileSummaryCard;

const Card = styled.section`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
`;

const ProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 12px;
    align-items: flex-start;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmailText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const EditButton = styled.button`
  font-size: 13px;
  background: none;
  border: none;
  padding: 0;
  color: #555;
`;
