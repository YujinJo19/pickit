import { axiosDel, axiosGet, axiosPost, axiosPut } from "./api";

// 배송지 등록
export const create = (id: number, data: any) =>
  axiosPost(`/user/${id}/address`, data);

// 배송지 목록 조회
export const getList = (id: number) => axiosGet(`/user/${id}/address`);

// 배송지 삭제
export const del = (id: number, addressIds: number[]) =>
  axiosDel(`/user/${id}/address`, {
    addressIds,
  });

// 배송지 수정
export const update = (id: number, addressId: number, data: any) =>
  axiosPut(`/user/${id}/address/${addressId}`, data);

// 기본 배송지 설정
export const updateDefault = (id: number, addressId: number) =>
  axiosPut(`/user/${id}/address/${addressId}/default`);
