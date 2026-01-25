import { axiosGet, axiosPost } from "./api";

// 로그인
export const login = (data: any) => {
  return axiosPost("/auth/login", data);
};

// 이메일 중복 확인
export const emailCheck = (email: string) => {
  return axiosGet("/email/check", { email });
};

// 인증 코드 전송
export const sendCode = (data: any) => {
  return axiosPost("/email/send", data);
};

// 인증 코드 검증
export const verifyCode = (data: any) => {
  return axiosPost("/email/verify", data);
};

// 회원가입
export const signup = (data: any) => {
  return axiosPost("/auth/signup", data);
};

// accessToken 재발급
export const refresh = (data?: any) => {
  return axiosPost("/auth/refresh", data);
};

// 로그아웃
export const logout = (data?: any) => {
  return axiosPost("/auth/logout", data);
};
