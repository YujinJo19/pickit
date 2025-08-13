import { axiosGet, axiosPost } from "./api";

// 회원정보 조회
export const getUser = (id: string) => axiosGet(`/user/${id}`);

// 로그인
export const login = (data: any) => axiosPost("/auth/login", data);

// 이메일 중복 확인
export const emailCheck = (email: string) =>
  axiosGet("/email/check", { email });

// 인증 코드 전송
export const sendCode = (data: any) => axiosPost("/email/send", data);

// 인증 코드 검증
export const verifyCode = (data: any) => axiosPost("/email/verify", data);

// 회원가입
export const signup = (data: any) => axiosPost("/auth/signup", data);

// accessToken 재발급
export const refresh = (data?: any) => axiosPost("/auth/refresh", data);

// 로그아웃
export const logout = (data?: any) => axiosPost("/auth/logout", data);
