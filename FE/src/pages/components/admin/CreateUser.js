import React, { useState } from 'react';
import { Button, Modal,  Form,
    Input,
    InputNumber,  Select, } from 'antd';
import { useToast } from "@chakra-ui/react";
import { createProduct, createUser } from '../../services';




const CreateUser = () => {
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
    onFinish()
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = async (values) => {
    const formdata = new FormData()
    formdata.append("username", values.username)
    formdata.append("password", values.password)
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
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new user
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
    >
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please fill the blank!' }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select one!' }]}>
        <Select>
          <Select.Option value="65465abf81225ec455f35aba">Customer</Select.Option>
          <Select.Option value="65465ae281225ec455f35abc">Admin</Select.Option>
        </Select>
      </Form.Item>
        <Form.Item label="Password" name="password">
        <Input />
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};
export default CreateUser;