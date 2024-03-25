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
        const admin = localStorage.getItem("user/admin");
        const { id } = JSON.parse(admin);
        const result = await axios.get(
          `http://localhost:8000/user/refeshToken/${id}`
        );
        localStorage.setItem("adminRefreshToken", result.data.refreshToken);
        localStorage.setItem("adminAccessToken", result.data.accessToken);
        return instance.request(error.config);
      } catch (e) {
        localStorage.removeItem("user/admin");
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
      const accessToken = localStorage.getItem("adminAccessToken");
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

export const createApiAdmin = () => {
  const instance = axios.create(defaultConfig);
  addInterceptorRequest(instance);
  addInterceptorResponse(instance);
  return instance;
};

const login = (username, password) => {
  return axios().post("/users/login", { username, password });
};

const createProduct = (data) => {
  return createApiAdmin().post("/products", data);
};

const getProduct = (pageSize = 3, pageIndex = 1) => {
  return createApiAdmin().get(
    `/products/get-pagging?pageSize=${pageSize}&pageIndex=${pageIndex}`
  );
};

const getProductById = (productId) => {
  return createApiAdmin().get(`/products/${productId}`);
};

const updateProduct = (id, data) => {
  return createApiAdmin().put(`/products/${id}`, data);
};

const deleteProduct = (id) => {
  return createApiAdmin().delete(`/products/${id}`);
};

const getUserById = (userId) => {
  return createApiAdmin().get(`/user/${userId}`);
};

const deleteUser = (id) => {
  return createApiAdmin().delete(`/user/${id}`);
};

const createUser = (data) => {
  return createApiAdmin().post("/user/register", data);
};

const getVariantById = (id) => {
  return createApiAdmin().get(`/variant/${id}`);
};

export {
  getProductById,
  deleteProduct,
  deleteUser,
  getProduct,
  getUserById,
  createUser,
  getVariantById,
  login,
  createProduct,
  updateProduct,
};
