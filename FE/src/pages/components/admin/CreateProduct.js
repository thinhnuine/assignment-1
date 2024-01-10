import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();
  const {id, accessToken} = JSON.parse(localStorage.getItem("user"))

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
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = async (values) => {

    try {
      const result = await axios.post(`http://localhost:8000/admin/product/${values.category}`, {
        name: values.name,
        slug: values.slug,
        detailProduct: {
            material: values.material,
            form: values.form,
            color: values.color,
            design: values.design,
            image: values.image,
          },
          thumbnail: values.thumbnail
      },{
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      toast({
        status: "success",
        title: "Tạo sản phẩm thành công",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "Tạo sản phẩm thất bại",
        position: "top",
      });
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new product
      </Button>
      <Modal
        title="Add product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" form="myForm" type="primary" htmlType="submit"  onClick={handleOk}>
              Submit
            </Button>]}
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
          id="myForm"
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select one!" }]}
          >
            <Select>
              <Select.Option value="65465abf81225ec455f35aba">
                Áo Thun
              </Select.Option>
              <Select.Option value="65465ae281225ec455f35abc">
                Baby Tee
              </Select.Option>
              <Select.Option value="65465af581225ec455f35abe">
                Áo Polo
              </Select.Option>
              <Select.Option value="65465b1e81225ec455f35ac0">
                Áo sơ mi
              </Select.Option>
              <Select.Option value="65465b6f81225ec455f35ac2">
                Áo khoác
              </Select.Option>
              <Select.Option value="65465ba081225ec455f35ac4">
                Hoodie
              </Select.Option>
              <Select.Option value="65465bc081225ec455f35ac6">
                Quần
              </Select.Option>
              <Select.Option value="65465be081225ec455f35ac8">
                Quần nữ
              </Select.Option>
              <Select.Option value="65465c0081225ec455f35aca">
                Phụ kiện
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Material" name="material">
            <Input />
          </Form.Item>
          <Form.Item label="Form" name="form">
            <Input />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>
          <Form.Item label="Design" name="design">
            <Input />
          </Form.Item>
          <Form.Item label="Detail image" name="image">
            <Input />
          </Form.Item>
          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            rules={[{ required: true, message: "Please fill the blank!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateProduct;
