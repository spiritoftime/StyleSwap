import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
interface ApiError {
  error: string;
  // You can add more fields as needed (e.g., errorCode, message, etc.).
}
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_APP_BASE_URL
      : "http://localhost:3000/api",
  // withCredentials: true,
});

export function makeRequest<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance(url, options)
    .then((res: AxiosResponse<T>) => {
      // if (!res.headers.authorization) return;

      // const headerAccessToken = res.headers.authorization.split(" ")[1];

      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${headerAccessToken}`;

      return res.data;
    })
    .catch((err: AxiosError<ApiError>) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
