import React from "react";
import Headers from "./Header";
import Footer from "./Footer";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <>
      <Headers />
      <section className="min-h-[57vh]">
        <div class="mb-10 container text-[#333]">
          <h1 class="text-2xl text-left mt-1">Giỏ hàng của bạn</h1>
          <div class="flex items-start gap-2.5 mt-3 md:gap-5 ">
            <img
              src="https://bizweb.dktcdn.net/thumb/compact/100/415/697/products/ao-thun-mat-truoc.jpg"
              alt="Áo Thun Teelab Local Brand Teelab Blockcore TS212"
              className=" w-[79px] xl:w-[144px]"
            />
            <div>
              <Link
                href="/ao-thun-teelab-phoi-blockcore-den-trang-ts212"
                title="Áo Thun Teelab Local Brand Teelab
                Blockcore TS212 Áo"
                className="text-sm xl:text-base"
              >
                Thun Teelab Local Brand Teelab Blockcore TS212
              </Link>
              <p className="text-xs text-[#333] mt-1">Đen/M</p>
              <div class=" flex justify-between mt-1">
                <div class="flex input-group-btn text-sm">
                  <button
                    type="button"
                    className="rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className=" rounded-none  border-[#e5e5e5] p-0 m-0 w-9 h-7 text-center border-t border-b"
                    maxlength="3"
                    pattern="[0-9]*"
                  />
                  <button className="rounded-none border border-[#e5e5e5] p-0 m-0 w-7 h-7">
                    +
                  </button>
                </div>
                <div class="w-1/2 text-right">
                  <span className="font-bold text-base text-red-500">
                    199.000đ
                  </span>
                  <p className="text-sm cursor-pointer">Xóa</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="flex mt-4 justify-between xl:justify-end xl:gap-2 items-center">
            <p className="text-base ">Tổng tiền:</p>
            <p className="font-bold text-base text-red-500">199.000đ</p>
          </div>
          <div className="lg:flex lg:justify-end">
            <Button
              type="primary"
              className="bg-black w-full lg:w-[300px] mt-3 !rounded-none"
              size="large"
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
