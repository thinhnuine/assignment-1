import React, { useEffect, useState } from 'react';
import { Button, Modal,  Form,
    Input,
    InputNumber,  Select, } from 'antd';
import { useToast } from "@chakra-ui/react";
import { createUser, getUserById } from '../../services';




const EditUser = (id) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm()
  const toast = useToast()


  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const getUser = async () => {
    try {
      const user = await getUserById(id.id);
      form.setFieldValue("username", user.data.user.username);
      form.setFieldValue("email", user.data.user.email);
      form.setFieldValue("role", user.data.user.role);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    const formdata = new FormData()
    formdata.append("username", values.username)
    formdata.append("email", values.email)
    formdata.append("role", values.role)
        try {
            const result = await createUser(formdata)

            toast({
                status: "success",
                title: "Tạo người dùng thành công",
                position: 'top'
            })
        } catch (error) {
            console.log(error)
            toast({
                status: "error",
                title: "Tạo người dùng thất bại",
                position: 'top'
            })
        }
    }
    useEffect(() => {
        getUser();
      }, []);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Add user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}

      >

        <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "small",
      }}
      size="small"
      style={{
        maxWidth: 800,
      }}
      autoComplete="off"
      form={form}
    >
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" >
        <Input/>
      </Form.Item>
      <Form.Item label="Role" name="role" >
        <Select>
          <Select.Option value="65465abf81225ec455f35aba">Customer</Select.Option>
          <Select.Option value="65465ae281225ec455f35abc">Admin</Select.Option>
        </Select>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};
export default EditUser;