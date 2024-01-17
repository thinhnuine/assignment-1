import React from "react";
import About from "./About";
import "./Decribe.css";
function Decribe(data) {
  return (
    <div className="container text-sm xl:text-base">
      <hr className="my-3" />
      <h2 className="desc-header text-base">MÔ TẢ SẢN PHẨM</h2>
      <p className="mt-1">
        Thông tin sản phẩm:
        <br />- Chất liệu: {data.productById.detailProduct.material}
        <br />- Form: {data.productById.detailProduct.form}
        <br />- Màu sắc: {data.productById.detailProduct.color}
        <br />- Thiết kế: {data.productById.detailProduct.design}
        <br />
      </p>
      <div className="flex items-center justify-center">
        <img
          className="w-[50%]"
          src={data.productById.detailProduct.image}
        ></img>
      </div>
      <About />
    </div>
  );
}

export default Decribe;
