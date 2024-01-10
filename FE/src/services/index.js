import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',

})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}
)

const login = (username, password) => {
    return axiosInstance.post('/users/login', { username, password })
}

const createProduct = (data) => {
    return axiosInstance.post('/products',  data )
}

const getProduct = (pageSize = 3, pageIndex = 1) => {
    return axiosInstance.get(`/products/get-pagging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const getProductById = (productId) => {
    return axiosInstance.get(`/products/${productId}`);
}

const updateProduct = (id,data) => { 
    return axiosInstance.put(`/products/${id}`, data);
}

const deleteProduct = (id) => {
    return axiosInstance.delete(`/products/${id}`);
}

export {
    login,
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}