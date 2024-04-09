import { Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { SHIPPING_FEE } from "./constants";

const CheckoutOrder = ({ form }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const listCarts = user?.cart?.cartDetail || [];
  const totalPrice = user?.cart?.totalPrice || 0;
  const totalItemInCarts =
    listCarts.length > 0 ? listCarts.reduce((prev, cur) => (prev += cur.quantity), 0) : 0;

  const selectedWardId = Form.useWatch("ward", form);

  const handleSubmit = () => {
    if (form) {
      form.submit();
    }
  };

  const formatNumber = number => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="border-l h-100 bg-[#fafafa00] pb-5">
      <div className="cart-title">
        <div className="title text-[#333] text-lg font-semibold py-[20px] pl-5 border-b">
          Đơn hàng ({totalItemInCarts} sản phẩm)
        </div>
        <div className="cart-details pl-5">
          <div className="list-carts py-[14px] flex flex-col gap-y-1 border-b">
            {listCarts.length > 0 &&
              listCarts.map(cartItem => (
                <div className="cart-item flex gap-3 flex-row items-center" key={cartItem?._id}>
                  <div className="product-image flex-shrink-0 relative w-12 h-12 border bg-[#fff] rounded-lg">
                    <img src={cartItem?.image} alt="product_image" className="w-12 h-12" />
                    <div className="cart-quantity absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex justify-center">
                      {cartItem?.quantity}
                    </div>
                  </div>
                  <div className="product-infos flex-grow">
                    <div className="product-name text-[#333] text-left font-medium">
                      {cartItem?.name}
                    </div>
                    <div className="product-type text-[#969696] text-xs">
                      {cartItem?.color} / {cartItem?.size}
                    </div>
                  </div>
                  <div className="product-price text-[#717171] text-sm">
                    {" "}
                    {(cartItem.priceDetail &&
                      formatNumber(
                        cartItem.priceDetail?.price *
                          ((100 - cartItem?.priceDetail.saleRatio) / 100)
                      )) ||
                      "0"}
                    đ
                  </div>
                </div>
              ))}
          </div>

          <div className="cart-price border-b py-[14px] flex flex-col gap-y-2">
            <div className="cart-price-item flex justify-between">
              <div className="label text-[#717171] text-sm">Tạm tính</div>
              <div className="value text-[#717171] text-sm">{formatNumber(totalPrice)}đ</div>
            </div>
            <div className="cart-price-item flex justify-between">
              <div className="label text-[#717171] text-sm">Phí vận chuyển</div>
              <div className="value text-[#717171] text-sm">
                {selectedWardId ? `${formatNumber(SHIPPING_FEE)}đ` : null}
              </div>
            </div>
          </div>

          <div className="cart-total-price py-[14px] flex justify-between items-center">
            <div className="total-label text-[17px] text-[#717171]">Tổng cộng</div>
            <div className="total-value text-[1.5rem] text-[#000000]">
              {formatNumber(totalPrice + (selectedWardId ? SHIPPING_FEE : 0))}đ
            </div>
          </div>

          <div className="form-submit-btn flex justify-between items-center">
            <button
              className="hover:scale-105 transition-all duration-300 ease-in-out text-[#000]"
              onClick={handleNavigateToCart}
            >
              &lt; Quay về giỏ hàng
            </button>
            <button
              className="text-[#FFFFFF] bg-[#000] py-[12px] px-[28px] rounded"
              onClick={handleSubmit}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrder;
