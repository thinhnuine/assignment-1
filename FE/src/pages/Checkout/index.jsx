import { Col, Row, Form } from "antd";
import React from "react";
import CheckoutInfos from "./CheckoutInfos";
import CheckoutOrder from "./CheckoutOrder";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUser();
  const [form] = Form.useForm();

  if (!isLoadingUser && (!user?.cart?.cartDetail || user?.cart?.cartDetail.length === 0)) {
    navigate("/cart");
    return;
  }

  return (
    <>
      <section className="container">
        <Row gutter={16} className="min-h-screen">
          <Col xs={24} lg={16}>
            <CheckoutInfos form={form} />
          </Col>
          <Col xs={24} lg={8}>
            <CheckoutOrder form={form} />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CheckoutPage;
