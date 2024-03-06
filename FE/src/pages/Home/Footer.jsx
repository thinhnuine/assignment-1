import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#000] px-2 py-5">
        <div className="container grid lg:grid-cols-3 justify-between items-start">
          <div className="flex items-center justify-center">
            <Link to="/">
              <p className="text-3xl text-white">Mind Clothing Store</p>
            </Link>
            {/* <ul>
              <li>
                <a href>
                  <i className="fa-solid fa-location-dot" />
                  <span>
                    CS1 - Thái Nguyên: 235 Quang Trung, TP Thái Nguyên
                  </span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fa-solid fa-location-dot" />
                  <span>
                    CS2 - Thái Nguyên: 599 Lương Ngọc Quyến, TP Thái Nguyên
                  </span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fa-solid fa-location-dot" />
                  <span>CS3 - Thái Bình: 161 Hai Bà Trưng, TP Thái Bình</span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fa-solid fa-location-dot" />
                  <span>CS4 - Vĩnh Phúc: 06 Mê Linh, TP Vĩnh Yên</span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fa-solid fa-location-dot" />
                  <span>CS5 - Hải Dương: 09 Nguyễn Thị Duệ, TP Chí Linh</span>
                </a>
              </li>
            </ul> */}
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#999999] mt-4 lg:text-center lg:mt-0">
              ĐĂNG KÝ
            </h3>
            <div className="center mt-2 flex">
              <input
                className="outline-none border-none flex-1 p-2"
                type="text"
                placeholder="Nhập địa chỉ email"
              />
              <div
                style={{ cursor: "pointer" }}
                className="send bg-[#646464] p-2.5 rounded-r-sm"
              >
                <i className="fa-solid fa-paper-plane text-white " />
              </div>
            </div>
            <p className="text-sm lg:text-base text-[#999999] mt-2">
              Theo dõi Mind Clothing Store từ các nền tảng khác nhau nhé!
            </p>
            <ul className="flex gap-3 mt-2">
              <li>
                <a href>
                  <img
                    src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/facebook.svg?1692958575148"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href>
                  <img
                    src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/instagram.svg?1692958575148"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href>
                  <img
                    src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/tiktok.svg?1692958575148"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href>
                  <img
                    src="	https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/shopeeico.png?1692958575148"
                    width="40px"
                    height="40px"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href>
                  <img
                    src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/lazadaico.png?1692958575148"
                    width="40px"
                    height="40px"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <ul className="text-[#999999] mt-4 text-sm  flex flex-col gap-3 lg:text-base lg:ml-20 lg:mt-0">
            <li>
              <a href>Trang chủ</a>
            </li>
            <li>
              <a href>Tất cả sản phẩm</a>
            </li>
            <li>
              <a href>Chính sách đổi trả</a>
            </li>
            <li>
              <a href>Bảng size</a>
            </li>
            <li>
              <a href>Kiểm tra đơn hàng</a>
            </li>
            <li>
              <a href>Hệ thống của hàng</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
