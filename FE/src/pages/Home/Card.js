import React from "react";
import Headers from "./Header";
import Footer from "./Footer";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./Card.css";

export default function Card() {
  return (
    <>
      <Headers />
      <section className="h-100 gradient-custom">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Sản Phẩm
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img className="w-100" alt="" />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>Blue denim shirt</strong>
                      </p>

                      <MDBTooltip
                        wrapperProps={{ size: "sm" }}
                        wrapperClass="me-1 mb-2"
                        title="Remove item"
                      >
                        <MDBIcon fas icon="trash" />
                      </MDBTooltip>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <MDBBtn className="px-3 me-2">
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          defaultValue={1}
                          min={0}
                          type="number"
                          label="Số Lượng"
                        />

                        <MDBBtn className="px-3 ms-2">
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>0đ</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <hr className="my-4" />
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody>
                  <p>
                    <strong>Thanh Toán Qua Các Ngân Hàng</strong>
                  </p>
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Tổng Tiền
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>0đ</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg">
                    Check Out
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}
