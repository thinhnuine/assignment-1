import axios from "axios";
// const {accessToken} = JSON.parse(localStorage.getItem("user"))

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

const getProductById = (productId) => {
    return axiosInstance.get(`/product/${productId}`,{
       
      })
}

const getUserById = (userId) => {
    return axiosInstance.get(`/user/${userId}`,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}

const deleteProduct = (id) => {
    return axiosInstance.delete(`/product/${id}`,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}
const deleteUser = (id) => {
    return axiosInstance.delete(`/user/${id}`,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}

const createProduct = (data) => {
    return axiosInstance.post('/product', data,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}

const getProduct = (pageSize = 10, pageIndex = 1) => {
    return axiosInstance.get(`/product/get-all-paging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const createUser = (data) => {
    return axiosInstance.post('/user/register', data,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}


const updateProduct = (id, data) => {
    return axiosInstance.put(`/product/${id}`, data,{
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      })
}


const getVariantById = (id) => {
    return axiosInstance.get(`/variant/${id}`)
}

export {
    getProductById,
    deleteProduct,
    deleteUser,
    updateProduct,
    getProduct,
    createProduct,
    getUserById,
    createUser,
    getVariantById
}