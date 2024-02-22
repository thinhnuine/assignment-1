import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../UserContext";
import emptyCartSvg from "../../assets/images/cart_empty.svg";
import { formatCurrencyInVnd } from "../../helper";
import { Link } from "react-router-dom";
import "./CartDropdown.css";

export default function CartDropdown() {
  const { user, updateUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const cartDetails = user?.cart?.cartDetail || [];
  const totalPrice = user?.cart?.totalPrice || 0;

  const changeQuantity = async (variantId, quantity) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:8000/user/cart",
        {
          variant: variantId,
          quantity,
          action: "changeQuantity",
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.data?.success) {
        updateUser();
      } else {
        message.error("Thay đổi số lượng không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API addVariantToCart:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeQuantity = (type, cartItem, inputQuantity) => {
    let newQuantity = cartItem.quantity;

    if (type === "increase") {
      newQuantity += 1;
    }
    if (type === "decrease") {
      newQuantity -= 1;
    }
    if (type === "update") {
      newQuantity = inputQuantity;
    }

    changeQuantity(cartItem.variant, newQuantity);
  };

  const hanelRemoveCartItem = async cartItem => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:8000/user/remove-cart/${cartItem.variant}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.data?.success) {
        updateUser();
      } else {
        message.error("Xoá không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API addVariantToCart:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full md:w-[340px] bg-white shadow-[0_3px_25px_0px_rgba(31,38,67,0.1)]">
      <div className="cart-list">
        {cartDetails.length > 0 ? (
          <>
            <div className="cart-list-item h-auto md:max-h-96 overflow-y-auto px-3 pt-3">
              {cartDetails.map(cartItem => {
                const priceAProduct =
                  cartItem.priceDetail.price * ((100 - cartItem.priceDetail.saleRatio) / 100);
                return (
                  <div className="cart-item flex justify-between gap-3 border-b border-[#ebebeb] pb-3 mb-3">
                    <div className="product-image flex-shrink-0">
                      <img src={cartItem.image} alt="product_image" className="w-16 h-16" />
                    </div>
                    <div className="product-details flex flex-col">
                      <div className="product-name mb-1">
                        <Link
                          to={`/detail/${cartItem?.productId}`}
                          title={cartItem?.name}
                          className="text-[13px] font-medium leading-[1.3]"
                        >
                          {cartItem.name}
                        </Link>
                      </div>
                      <div className="product-size-color text-xs">
                        {cartItem.color} / {cartItem.size}
                      </div>
                      <div className="product-quantity-price grid grid-cols-2">
                        <div className="box-left">
                          <span className="text-xs mb-1 text-[#333333]">Số lượng</span>
                          <div className="flex justify-start text-sm">
                            <button
                              type="button"
                              className="rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7 leading-6 text-lg disabled:bg-[#0000000a] disabled:cursor-not-allowed"
                              onClick={() => handleChangeQuantity("decrease", cartItem)}
                              disabled={isLoading || cartItem.quantity === 1}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="rounded-none border-[#e5e5e5] p-0 m-0 w-9 h-7 text-center border-t border-b disabled:bg-[#0000000a] disabled:cursor-not-allowed"
                              maxlength="2"
                              pattern="[0-9]*"
                              value={cartItem.quantity}
                              onChange={event =>
                                handleChangeQuantity("update", cartItem, event.target.value)
                              }
                              disabled={isLoading}
                            />
                            <button
                              className="rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7 leading-6 text-lg disabled:bg-[#0000000a] disabled:cursor-not-allowed"
                              onClick={() => handleChangeQuantity("increase", cartItem)}
                              disabled={isLoading}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="box-right">
                          <div className="price-item text-sm text-[#ff0000] font-bold">
                            {formatCurrencyInVnd(priceAProduct)}đ
                          </div>
                          <button
                            className="font-light text-[#30656b] text-[13px] inline"
                            onClick={() => hanelRemoveCartItem(cartItem)}
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 p-3">
              <div className="total-price flex justify-between">
                <span>Tổng tiền:</span>
                <div className="price-value text-[15px] text-[#ff0000] font-bold">
                  {formatCurrencyInVnd(totalPrice)}đ
                </div>
              </div>
              <div>
                <button className="w-full text-white bg-black text-center leading-10">
                  Thanh toán
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={emptyCartSvg} alt="empty cart" className="w-14 h-14" />
            <span className="text-base text-center">
              Không có sản phẩm nào trong giỏ hàng của bạn
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
