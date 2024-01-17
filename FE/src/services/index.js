import axios from "axios";
import { Router } from "react-router-dom";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/",
// });

const defaultConfig = {
  timeout: 50000,
  basePath: "http://localhost:8000/",
};

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log(token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

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
        const userId = localStorage.getItem("refreshToken");
        const result = await createApiPjc.get(`/refeshToken/${userId}`);
        localStorage.setItem("refreshToken", result.refreshToken);
        return instance.request(error.config);
      } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
      const accessToken = localStorage.getItem("accessToken");
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

export const createApiPjc = () => {
  const instance = axios.create(defaultConfig);
  addInterceptorRequest(instance);
  addInterceptorResponse(instance);
  return instance;
};

const login = (username, password) => {
  return createApiPjc.post("/users/login", { username, password });
};

const createProduct = (data) => {
  return createApiPjc.post("/products", data);
};

const getProduct = (pageSize = 3, pageIndex = 1) => {
  return createApiPjc.get(
    `/products/get-pagging?pageSize=${pageSize}&pageIndex=${pageIndex}`
  );
};

const getProductById = (productId) => {
  return createApiPjc.get(`/products/${productId}`);
};

const updateProduct = (id, data) => {
  return createApiPjc.put(`/products/${id}`, data);
};

const deleteProduct = (id) => {
  return createApiPjc.delete(`/products/${id}`);
};

export {
  login,
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
