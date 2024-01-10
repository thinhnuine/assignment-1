import React from "react";
import About from "./About";
import "./Decribe.css";
function Decribe(data) {
  return (
    <div className="desc-container">
      <h2 className="desc-header">MÔ TẢ SẢN PHẨM</h2>
      <p>
        Thông tin sản phẩm:
        <br />
        - Chất liệu: {data.productById.detailProduct.material}
        <br />
        - Form: {data.productById.detailProduct.form}
        <br />
        - Màu sắc: {data.productById.detailProduct.color}
        <br />
        - Thiết kế: {data.productById.detailProduct.design}
        <br />
      </p>
      <img
        className="desc-img"
        src={data.productById.detailProduct.image}
      ></img>
      <About />
    </div>
  );
}

export default Decribe;
