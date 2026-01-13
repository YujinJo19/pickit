import React, { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  deleteProfileImg,
  updateProfileImg,
} from "../../store/thunks/userThunk";
import { styled } from "styled-components";
import { DEFAULT_PROFILE_IMAGE, toUrl } from "../../utils/image";

interface Props {
  userId: number;
  imageUrl?: string;
}
const ProfileImageUploader = ({ userId, imageUrl }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const updatedUser = await dispatch(
        updateProfileImg({ userId, formData })
      ).unwrap();
    } catch (err) {
      console.error("프로필 이미지 수정 실패", err);
    }
  };

  const handleResetToDefault = async () => {
    const ok = window.confirm("프로필 이미지를 기본 이미지로 변경할까요?");
    if (!ok) return;

    try {
      await dispatch(deleteProfileImg(userId)).unwrap();
    } catch (err) {
      console.error("프로필 이미지 초기화 실패", err);
    }
  };
  return (
    <ProfileImageWrapper>
      <ProfileImage src={imageUrl ? toUrl(imageUrl) : DEFAULT_PROFILE_IMAGE} />
      <ButtonGroup>
        <ImageEditButton onClick={handleClick}>수정</ImageEditButton>

        {imageUrl && (
          <ImageResetButton onClick={handleResetToDefault}>
            기본 이미지
          </ImageResetButton>
        )}
      </ButtonGroup>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </ProfileImageWrapper>
  );
};

export default ProfileImageUploader;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  display: flex;
  gap: 4px;
`;

const ImageEditButton = styled.button`
  font-size: 11px;
  padding: 4px 6px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #fff;
`;

const ImageResetButton = styled.button`
  font-size: 11px;
  padding: 4px 6px;
  border-radius: 8px;
  border: none;
  background: #aaa;
  color: #fff;
`;
