import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Popconfirm } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { deleteUser } from "../../services";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";



const UserAdmin = () => {
  const {id, accessToken} = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState([]);
    const toast = useToast()
    useEffect(() => {
      axios
        .get("http://localhost:8000/user",{
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        })
        .then((response) => setUser(response.data.user))
        .catch((error) => console.error("Error:", error));
    }, []);

    
    const deleteUser = async (id) => {
        try {
            await deleteUser(id)
            toast({
                status: "success",
                title: "Xoá người dùng thành công",
                position: 'top'
            })
            setUser(user.filter(item => item._id != id))
        } catch (error) {
            toast({
                status: "error",
                title: "Delete product failed",
                position: 'top'
            })
        }
    }
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "User Name",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <EditUser id={record._id}/>
            <Popconfirm title="Delete user" description="Are you sure to delete this user?" onConfirm={() => { deleteUser(record._id) }}><a style={{color: "red"}} >Delete</a></Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <>
      <CreateUser/>
     <Table columns={columns} dataSource={user} />
      </>
    )
};
export default UserAdmin;
