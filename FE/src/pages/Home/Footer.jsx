import React from "react";

const Footer = () => {
    return(
        <>
        <footer>
  <div className="container">
    <div className="left">
      <h3>TEELAB</h3>
      <ul>
        <li>
          <a href>
            <i className="fa-solid fa-location-dot" />
            <span>CS1 - Thái Nguyên: 235 Quang Trung, TP Thái Nguyên</span>
          </a>
        </li>
        <li>
          <a href>
            <i className="fa-solid fa-location-dot" />
            <span>CS2 - Thái Nguyên: 599 Lương Ngọc Quyến, TP Thái Nguyên</span>
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
      </ul>
    </div>
    <div className="center">
      <h3>ĐĂNG KÝ</h3>
      <div className="center-email">
        <input style={{margin:'0px'}} type="text" placeholder="Nhập địa chỉ email" />
        <div style={{cursor: 'pointer'}} className="send">
          <i className="fa-solid fa-paper-plane" />
        </div>
      </div>
      <p>Theo dõi Teelab từ các nền tảng khác nhau nhé!
      </p>
      <ul>
        <li>
          <a href>
            <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/facebook.svg?1692958575148" alt="" />
          </a>
        </li>
        <li>
          <a href>
            <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/instagram.svg?1692958575148" alt="" />
          </a>
        </li>
        <li>
          <a href>
            <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/tiktok.svg?1692958575148" alt="" />
          </a>
        </li>
        <li>
          <a href>
            <img src="	https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/shopeeico.png?1692958575148" width="40px" height="40px" alt="" />
          </a>
        </li>
        <li>
          <a href>
            <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/lazadaico.png?1692958575148" width="40px" height="40px" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <div className="right">
      <h3>ABOUT US</h3>
      <ul>
        <li>
          <a href>
            Trang chủ
          </a>
        </li>
        <li>
          <a href>
            Tất cả sản phẩm
          </a>
        </li>
        <li>
          <a href>
            Chính sách đổi trả
          </a>
        </li>
        <li>
          <a href>
            Bảng size
          </a>
        </li>
        <li>
          <a href>
            Kiểm tra đơn hàng
          </a>
        </li>
        <li>
          <a href>
            Hệ thống của hàng
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>

        </>
    );
}

export default Footer;