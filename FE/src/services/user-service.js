import axios from "axios";
import { Router } from "react-router-dom";

const defaultConfig = {
  timeout: 50000,
  basePath: "http://localhost:8000/",
};

const addInterceptorResponse = (instance) => {
  const interceptorId = instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      // Not authentication error
      if (error?.response?.status !== 401 && error?.response?.status !== 403) {
        return Promise.reject(error);
      }

      instance.interceptors.response.eject(interceptorId);
      try {
        const user = localStorage.getItem("user");
        const { id } = JSON.parse(user);
        const result = await axios.get(
          `http://localhost:8000/user/refeshToken/${id}`
        );
        localStorage.setItem("userRefreshToken", result.data.refreshToken);
        localStorage.setItem("userAccessToken", result.data.accessToken);
        return instance.request(error.config);
      } catch (e) {
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("user");
        Router.push("/login");
        return Promise.reject(error);
      } finally {
        addInterceptorResponse(instance);
      }
    }
  );
};

const addInterceptorRequest = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("userAccessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const createApiUser = () => {
  const instance = axios.create(defaultConfig);
  addInterceptorRequest(instance);
  addInterceptorResponse(instance);
  return instance;
};
