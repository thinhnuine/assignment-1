import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getVariantById } from "../../services";

const EditVariant = (id) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  console.log(id.id);
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

  const getVariant = async () => {
    try {
      const variant = await getVariantById(id.id);
      form.setFieldValue("name", variant.data.variant.name);
      form.setFieldValue("image", variant.data.variant.image);
      form.setFieldValue("price", variant.data.variant.priceDetail.price);
      form.setFieldValue("saleRatio", variant.data.variant.priceDetail.saleRatio);
      form.setFieldValue("color", variant.data.variant.color);
      form.setFieldValue("size", variant.data.variant.size);
      form.setFieldValue("countInStock", variant.data.variant.countInStock);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      const result = await axios.put(
        `http://localhost:8000/admin/variant/${id.id}`,
        {
          name: values.name,
          image: values.image,
          priceDetail: {
            price: values.price,
            saleRatio: values.saleRatio,
          },
          color: values.color,
          size: values.size,
          countInStock: values.countInStock,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
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

  useEffect(() => {
    getVariant();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Add variant"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            form="myForm"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
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
          form={form}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Sale Ratio" name="saleRatio">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="size">
            <Input />
          </Form.Item>
          <Form.Item label="Count In Stock" name="countInStock">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditVariant;
