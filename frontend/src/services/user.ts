import { axiosDel, axiosGet, axiosPost, axiosPut } from "./api";

// 회원정보 조회
export const getUser = (id: number) => axiosGet(`/user/${id}`);

// 회원탈퇴
export const deleteUser = (id: number) => axiosDel(`/user/${id}`);

// 프로필 수정
export const updateProfile = (id: number, data: any) =>
  axiosPut(`/user/${id}/profile`, data);

// 프로필 이미지 수정
export const updateProfileImg = (id: number, formData: FormData) =>
  axiosPost(`/user/${id}/profile-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 프로필 이미지 삭제
export const deleteProfileImg = (id: number) =>
  axiosDel(`/user/${id}/profile-image`);
