import axios from "axios";
import { getToken, removeToken, setToken } from "../utils/token";

const API_URL = process.env.REACT_APP_BACKEND_BASEURI;
const ACCESS_TOKEN = process.env.REACT_APP_DEV_ACCESS_TOKEN;

let axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 - 모든 요청에 토큰 포함 시킴
axiosInstance.interceptors.request.use((config) => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development" && ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } else {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 응답 인터셉터 - 토큰 만료 시 refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.accessToken;
        setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const axiosGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params });

export const axiosPost = (url: string, data?: any, config?: any) =>
  axiosInstance.post(url, data, config);

export const axiosDel = (url: string) => axiosInstance.delete(url);

export const axiosPut = (url: string, data: any, config?: any) =>
  axiosInstance.put(url, data, config);

export const axiosPatch = (url: string, data: any, config?: any) =>
  axiosInstance.patch(url, data, config);

export const axiosGetFile = (url: string) =>
  axiosInstance.get(url, { responseType: "blob" });

export const axiosPostFile = (url: string, data: any) =>
  axiosInstance.post(url, data, { responseType: "blob" });

export default axiosInstance;
