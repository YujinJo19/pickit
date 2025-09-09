import { jwtDecode } from "jwt-decode";

export const isAutoLogin = () => localStorage.getItem("autoLogin") === "true";

export const setToken = (token: string) => {
  if (isAutoLogin()) {
    localStorage.setItem("accessToken", token);
  } else {
    sessionStorage.setItem("accessToken", token);
  }
};

export const getToken = () => {
  return (
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  );
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("autoLogin");
};

export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log("Invalid token", error);
    return null;
  }
};

export const getRoleFromToken = (token: string) => {
  const decoded: any = decodeToken(token);
  return decoded ? decoded?.role : "";
};
