import axios from "axios";
import Cookies from "js-cookie";

const apiToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

apiToken.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiToken;
