import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, InputNumber } from 'antd';
import Footer from "./Home/Footer";
import Header from "./Home/Header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',

})

axiosInstance.interceptors.request.use((config) => {
  const {accessToken} = JSON.parse(localStorage.getItem("user"));
  
  console.log(accessToken)
  if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
}
)


const Profile = () => {
  
  // const email = JSON.parse(localStorage.getItem("user"));

  // const [user, setUser] =useState([]);
  // const [form] = Form.useForm();
  
//lan1

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/user/653a23afa2e8f6969e54bb9e")
//       .then((response) => {
//         setUser(response.data.user);
        
//       })
//       .catch((error) => {
//         console.error("Lỗi khi lấy được thông tin người dùng:", error);
//       });
//       // form.setFieldValue("username", user.username);
//   }, []);
//  console.log(user);
//  const getUser =  (user) => {
//   try {
    
//     form.setFieldValue("username", user.username);
//     form.setFieldValue("birth_year", user.birth_year);
//     form.setFieldValue("email", user.email);
//     form.setFieldValue("phone", user.phone);
    
//   } catch (error) {
//     // console.log(error);
//   }
// };
//  useEffect(()=>{
  
//   getUser(user);
//  },[])

//  console.log(user);


//lan2

// useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   if (storedUser) {
//     setUser(storedUser);
//     form.setFieldsValue({
//       username: storedUser.username,
//       birth_year: storedUser.birth_year,
//       email: storedUser.email,
//       phone: storedUser.phone,
//     });
//   } else {
//     axios
//       .get("http://localhost:8000/user/:id")
//       .then((response) => {
//         const userData = response.data.user;
//         setUser(userData);
//         form.setFieldsValue({
//           username: userData.username,
//           birth_year: userData.birth_year,
//           email: userData.email,
//           phone: userData.phone,
//         });
//         localStorage.setItem("user", JSON.stringify(userData));
//       })
//       .catch((error) => {
//         console.error("Lỗi khi lấy được thông tin người dùng:", error);
//       });
//   }
// }, []);


//lan3

const [user, setUser] = useState({}); // Sử dụng useState để lưu thông tin người dùng

  const [form] = Form.useForm();

  useEffect(() => {
    const {id} = JSON.parse(localStorage.getItem("user"))
    axios
      .get(`http://localhost:8000/user/${id}`) // Thay :id bằng id thực tế của user
      .then((response) => {
        const userData = response.data.user;
        console.log(userData);

        setUser(userData);
        form.setFieldsValue({
          userName: userData.userName,
          birth_year: userData.birth_year,
          email: userData.email,
          phone: userData.phone,
          // Thêm các trường cần thiết tương ứng với MongoDB của bạn
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy được thông tin người dùng:", error);
      });
  }, [form]);
  

  //PUT
  // const handleUpdate = (values) => {
  //   const { username, email, birth_year, phone } = values; // Extract values from the form
    
  //   const { id } = JSON.parse(localStorage.getItem("user")); // Get the user ID from localStorage
  
  //   const updatedUserData = {
  //     username,
  //     email,
  //     birth_year,
  //     phone,
  //     // Include other fields if needed
  //   };
  
  //   axios
  //     .put(`http://localhost:8000/user/${id}`, updatedUserData)
  //     .then((response) => {
  //       console.log("User data updated successfully:", response.data);
  //       // Handle success, update state or perform other actions upon successful update
  //       alert('Update thành công!')
  //       const token = localStorage.getItem('token');
  //   console.log(token)
  //   if (token) {
  //       response.headers.Authorization = `Bearer ${token}`}
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.error("Error updating user data:", error);
  //       // Handle error cases upon unsuccessful update
  //     });
  // };


  const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
  const { userName, email, birth_year, phone } = values; // Extract values from the form
  
  const { id, accessToken } = JSON.parse(localStorage.getItem("user")); // Get the user ID from localStorage

  const updatedUserData = {
    userName,
    email,
    birth_year,
    phone,
    // Include other fields if needed
  };

  axios
    .put(`http://localhost:8000/user/${id}`, updatedUserData,{
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    .then((response) => {
      console.log("User data updated successfully:", response.data);
      // Handle success, update state or perform other actions
      alert("Update thành công!")
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      // Handle error
    });
};



  return (
    <>
    <Header />
    <div style={{width: '100%', marginTop: '50px'}}>
    <Form 
    form = {
      form
    }
  {...layout}
  name="nest-messages"
  onFinish={onFinish}
  style={{
    maxWidth: 600,
    // marginTop: '20px',
    // marginLeft: '200px'
    margin: 'auto'
  }}
  validateMessages={validateMessages}
>
  <Form.Item
    name='userName'
    label="Name"
    rules={[
      {
        required: true,
      },
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name='email'
    label="Email"
    rules={[
      {
        type: 'email',
      },
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name='birth_year'
    label="Birthyear"
    rules={[
      {
        type: 'number',
        min: 1900,
        max: 2100,
      },
    ]}
  >
    <InputNumber />
  </Form.Item>
  <Form.Item name='phone' label="Phone">
    <Input />
  </Form.Item>
  <Form.Item name={['user', 'introduction']} label="Introduction">
    <Input.TextArea />
  </Form.Item>
  <Form.Item
    wrapperCol={{
      ...layout.wrapperCol,
      offset: 8,
    }}
  >
    <Button type="primary" htmlType="submit">
      Update
    </Button>
  </Form.Item>
</Form>
  </div>
  <Footer />
  </>
    
  );
};

export default Profile;
