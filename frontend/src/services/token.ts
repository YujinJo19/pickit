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
};
