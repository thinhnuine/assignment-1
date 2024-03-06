import { createApiPjc } from "../../services";

const getProductById = (productId) => {
  return createApiPjc().get(`/product/${productId}`);
};

const getUserById = (userId) => {
  return createApiPjc().get(`/user/${userId}`);
};

const deleteProduct = (id) => {
  return createApiPjc().delete(`/product/${id}`);
};
const deleteUser = (id) => {
  return createApiPjc.delete(`/user/${id}`);
};

const createProduct = (data) => {
  return createApiPjc.post("/product", data);
};

const getProduct = (pageSize = 10, pageIndex = 1) => {
  return createApiPjc.get(
    `/product/get-all-paging?pageSize=${pageSize}&pageIndex=${pageIndex}`
  );
};

const createUser = (data) => {
  return createApiPjc.post("/user/register", data);
};

const updateProduct = (id, data) => {
  return createApiPjc.put(`/product/${id}`, data);
};

const getVariantById = (id) => {
  return createApiPjc.get(`/variant/${id}`);
};

export {
  getProductById,
  deleteProduct,
  deleteUser,
  updateProduct,
  getProduct,
  createProduct,
  getUserById,
  createUser,
  getVariantById,
};
