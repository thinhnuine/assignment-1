import { message, Col, Form, Input, Radio, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeAccentInVietnamese } from "../../helper";
import jsonData from "./data.json";
import "./CheckoutInfos.css";
import CodIcon from "./CodIcon";
import { SHIPPING_FEE } from "./constants";
import CardIcon from "./CardIcon";
import ShipIcon from "./ShipIcon";
import PersonIcon from "./PersonIcon";
import axios from "axios";
import { useUser } from "../../UserContext";

const { TextArea } = Input;

const CheckoutInfos = ({ form }) => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const totalPrice = user?.cart?.totalPrice || 0;

  const [listProvinces] = useState(
    jsonData.map(item => ({ value: item.level1_id, label: item.name, level2s: item.level2s }))
  );
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);

  const selectedProvinceId = Form.useWatch("province", form);
  const selectedDistrictId = Form.useWatch("district", form);
  const selectedWardId = Form.useWatch("ward", form);
  const paymentType = Form.useWatch("paymentType", form);

  const handleFinish = values => {
    const provinceId = values.province;
    const districtId = values.district;
    const wardId = values.ward;
    const provinceName = listProvinces.find(item => item.value === provinceId).label;
    const districtName = listDistricts.find(item => item.value === districtId).label;
    const wardName = listWards.find(item => item.value === wardId).label;
    const address = `${values.address} - ${wardName}`;
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

    axios
      .post(
        "http://localhost:8000/order/payment",
        {
          orderDetail: user?.cart?.cartDetail,
          totalPrice,
          shippingAddress: {
            address,
            district: districtName,
            city: provinceName,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(resp => {
        if (resp?.data?.success) {
          message.success("Chúc mừng bạn đã tạo đơn hàng thành công", 5);
          handleResetCart();
        } else {
          throw new Error("Tạo đơn hàng thất bại");
        }
      })
      .catch(err => {
        message.error(err?.message || "Tạo đơn hàng thất bại");
      });
  };

  const handleResetCart = () => {
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

    axios
      .delete("http://localhost:8000/user/empty-cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        updateUser();
        navigate("/");
      })
      .catch(err => {
        message.error(err?.message || "Xoá giỏ hàng thất bại");
      });
  };

  const formatNumber = number => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (selectedProvinceId) {
      const listDistricts = listProvinces.find(item => item.value === selectedProvinceId).level2s;

      form.setFieldValue("district", null);
      form.setFieldValue("ward", null);
      setListDistricts(
        listDistricts.map(item => ({
          value: item.level2_id,
          label: item.name,
          level3s: item.level3s,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, form]);

  useEffect(() => {
    if (selectedDistrictId) {
      const currentWards = listDistricts.find(item => item.value === selectedDistrictId).level3s;

      form.setFieldValue("ward", null);
      setListWards(currentWards.map(item => ({ value: item.level3_id, label: item.name })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrictId, form]);

  return (
    <div className="px-0 py-8 lg:p-8">
      <div className="text-3xl text-center mb-3">
        <Link to="/">Mind Clothing Store</Link>
      </div>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ shipType: "normal" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <h3 className="text-lg font-semibold text-[#333] mb-2 flex justify-start gap-2 items-center">
              <span className="inline lg:hidden checkout-heading-icon">
                <PersonIcon />
              </span>
              <span>Thông tin nhận hàng</span>
            </h3>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên",
                },
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Sai định dạng số điện thoại",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              name="province"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa chọn tỉnh thành",
                },
              ]}
            >
              <Select
                placeholder="Tỉnh thành"
                showSearch
                title="Tỉnh thành"
                options={listProvinces}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  removeAccentInVietnamese(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccentInVietnamese(input.toLowerCase()))
                }
              />
            </Form.Item>
            <Form.Item
              name="district"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa chọn quận huyện",
                },
              ]}
            >
              <Select
                disabled={!selectedProvinceId}
                placeholder="Quận huyện"
                showSearch
                title="Quận huyện"
                options={listDistricts}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  removeAccentInVietnamese(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccentInVietnamese(input.toLowerCase()))
                }
              />
            </Form.Item>
            <Form.Item
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa chọn phường xã",
                },
              ]}
            >
              <Select
                disabled={!selectedDistrictId}
                placeholder="Phường xã"
                showSearch
                title="Phường xã"
                options={listWards}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  removeAccentInVietnamese(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccentInVietnamese(input.toLowerCase()))
                }
              />
            </Form.Item>
            <Form.Item name="note">
              <TextArea rows={3} placeholder="Ghi chú (tùy chọn)" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <h3 className="text-lg font-semibold text-[#333] mb-2 flex justify-start gap-2 items-center">
              <span className="inline lg:hidden checkout-heading-icon">
                <ShipIcon />
              </span>
              <span>Vận chuyển</span>
            </h3>
            {selectedWardId ? (
              <Form.Item name="shipType">
                <div className="px-[20px] py-3 border boder-[#cecdcd] rounded text-[##545454]">
                  <Radio.Group className="ship-type-radio" defaultValue="normal">
                    <Radio value="normal" className="w-100">
                      <div className="flex justify-between w-100">
                        <div className="title">Giao hàng thông thường</div>
                        <div className="value">{formatNumber(SHIPPING_FEE)}đ</div>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            ) : (
              <div className="px-[20px] py-3 bg-[#d1ecf1] border-[#bee5eb] rounded-sm text-sm">
                Vui lòng nhập thông tin giao hàng
              </div>
            )}
            <h3 className="text-lg font-semibold text-[#333] my-2 flex justify-start gap-2 items-center">
              <span className="inline lg:hidden checkout-heading-icon">
                <CardIcon />
              </span>
              <span>Thanh toán</span>
            </h3>
            <Form.Item
              name="paymentType"
              rules={[{ required: true, message: "Bạn cần chọn phương thức thanh toán" }]}
              className="mb-0"
            >
              <div className="px-[20px] py-3 border boder-[#cecdcd] rounded-t text-[#545454]">
                <Radio.Group className="payment-type-radio">
                  <Radio value="COD" className="w-100">
                    <div className="flex justify-between w-100">
                      <div className="title">Thanh toán khi giao hàng (COD)</div>
                      <div className="cod-ico text-md">
                        <CodIcon />
                      </div>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            {paymentType && (
              <div className="px-[20px] py-3 bg-[#f8f8f8] border-x border-b border-t-0">
                Bạn sẽ thanh toán khi nhận được hàng
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CheckoutInfos;
