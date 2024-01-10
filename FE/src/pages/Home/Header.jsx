import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useUser } from "../../UserContext";

const Header = () => {
  const navigate = new useNavigate();

  const name = JSON.parse(localStorage.getItem("user"));
  const handleOnclick = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const [handleModal, setHandleModal] = useState(false);
  const [login, setLogin] = useState(true);


  //Login
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);
  const setUser = useContext( useUser );

  const { updateUser } = useUser();
  const  handleLogin = async () => {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email: userName, password }), // body data type must match "Content-Type" header
    }).
    then((res) => res.json().then((data) => {
      if(data.email === userName){
        localStorage.setItem("user", JSON.stringify(data));
        setHandleModal(!handleModal)
        navigate("/");
        alert("Đăng nhập thành công!")
      }
      else{
        alert("Tài khoản hoặc mật khẩu sai!");
      }
    }));
    updateUser();
  };


  const [userNameRegister, setUserNameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [checkPasswordRegister, setCheckPasswordRegister] = useState("");

  const handleAddUser = () => {
    const response = fetch("http://localhost:8000/user/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email: userNameRegister, password: passwordRegister }), // body data type must match "Content-Type" header
    });

    
    response.then((res) => res.json().then((data) =>{
      console.log(data);
      if(checkPasswordRegister != passwordRegister){
        alert("Mật khẩu không trùng khớp!");
        return false;
      } else if(userNameRegister === data.email){
        alert("Tài khoản đã tồn tại!")
        return false;
      }else{
        setHandleModal(!handleModal)
        alert("Bạn đã lập tài khoản thành công!");
        navigate("/");
      }

    }));
  };

  return (
    <>
      <div>
        <div className="topbar">
          <div className="container">
            <div className="form-search">
              <input type="text" placeholder="Tìm kiếm sản phẩm" />
              <div style={{ cursor: "pointer" }} className="icon">
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </div>
            <ul>
              {name ? (
                <>
                  {" "}
                  <li>
                    <Link to="/profile">
                      <a style={{ color: "black" }}>
                        <i class="fa-regular fa-user"></i>
                        {` ${name.email.split("@")[0]}`}
                      </a>
                    </Link>{" "}
                    <a href="#" onClick={handleOnclick}>
                      ĐĂNG XUẤT
                    </a>
                  </li>{" "}
                </>
              ) : (
                <li>
                  <a className="login-header-hover"
                    style={{ cursor: "pointer" }}
                    onClick={() => setHandleModal(!handleModal)}
                  >
                    ĐĂNG NHẬP
                  </a>
                </li>
              )}
            </ul>
            <div style={{ cursor: "pointer" }} className="cart">
            <Link to="/card"><i className="fa-solid fa-cart-shopping" /></Link>
              <span>0</span>
              {/* <span>{setUser.cart.cartDetail.length()}</span> */}
            </div>
          </div>
        </div>
        <header>
          <div className="container">
            <ul>
              <li>
                <Link to="/">TRANG CHỦ</Link>
              </li>
              <li>
                <a href>CHÍNH SÁCH ĐỔI TRẢ</a>
              </li>
              <li>
                <Link to="/">
                  <img
                    src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/logo.png?1692958575148"
                    alt=""
                  />
                </Link>
              </li>
              <li>
                <a href>BẢNG SIZE</a>
              </li>
              <li>
                <a href>HỆ THỐNG CỦA HÀNG</a>
              </li>
            </ul>
          </div>
          <div className="container menu">
            <ul>
              <li>
                <Link to="/shop">Tất cả sản phẩm</Link>
              </li>
              <li>
                <a href>Áo Thun</a>
              </li>
              <li>
                <a href>Baby Tee</a>
              </li>
              <li>
                <a href>Áo Polo</a>
              </li>
              <li>
                <a href>Áo sơ mi</a>
              </li>
              <li>
                <a href>Áo khoác</a>
              </li>
              <li>
                <a href>Hoodie</a>
              </li>
              <li>
                <a href>Quần</a>
              </li>
              <li>
                <a href>Quần nữ</a>
              </li>
              <li>
                <a href>phụ kiện</a>
              </li>
            </ul>
          </div>
        </header>
      </div>
      <Modal handleModal={handleModal} setHandleModal={setHandleModal}>
        
        <a
          style={{
            color: "red",
            fontSize: "24px",
            display: "inline-flex",
            width: "100%",
            height: "100%",
            justifyContent: "end",
            cursor: "pointer",
          }}
          onClick={() => setHandleModal(!handleModal)}
        >
          X
        </a>
        <div style={{display:'flex', justifyContent: "center"}}><img  src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/logo.png?1692958575148" alt="" /></div>
        {login ? (
          <div>
            <div className="login">
              <h1 style={{marginBottom: '10px'}}>Đăng nhập</h1>
              
              <p>Vui lòng nhập thông tin tài khoản</p>
              <hr />
              <label htmlFor="username">
                <b>Tên đăng nhập</b>
              </label>
              <input
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0 22px 0',
                display: 'inline-block',
                border: 'none',
                background: '#ffffff',
                backgroundColor: '#ddd',
                outline: 'none'
              }}
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                placeholder="Mời nhập tên tài khoản"
                name="username"
                id="username"
              />

              <label htmlFor="password">
                <b>Mật khẩu</b>
              </label>
              <input
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0 22px 0',
                display: 'inline-block',
                border: 'none',
                background: '#ffffff',
                backgroundColor: '#ddd',
                outline: 'none'
              }}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="******"
                name="password"
                id="password"
              />

              <hr />
              <button onClick={handleLogin} type="submit" className="submit">
                Đăng nhập
              </button>
            </div>
            <div className="register-login">
              <p>
                Bạn chưa có tài khoản?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                >
                  Đăng ký
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="register">
              <h1 style={{marginBottom: '10px'}}>Đăng ký</h1>
              <p>Vui lòng điền thông tin để đăng ký</p>
              <hr />

              <label htmlFor="username">
                <b>Tên đăng nhập</b>
              </label>
              <input
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0 22px 0',
                display: 'inline-block',
                border: 'none',
                background: '#ffffff',
                backgroundColor: '#ddd',
                outline: 'none'
              }}
                value={userNameRegister}
                onChange={(event) => setUserNameRegister(event.target.value)}
                type="text"
                placeholder="Mời nhập tên tài khoản"
                name="username"
                id="username"
              />

              <label htmlFor="password">
                <b>Mật khẩu</b>
              </label>
              <input
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0 22px 0',
                display: 'inline-block',
                border: 'none',
                background: '#ffffff',
                backgroundColor: '#ddd',
                outline: 'none'
              }}
                value={passwordRegister}
                onChange={(event) => setPasswordRegister(event.target.value)}
                type="password"
                placeholder="******"
                name="password"
                id="password"
              />

              <label htmlFor="password-repeat">
                <b>Nhập lại mật khẩu</b>
              </label>
              <input
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0 22px 0',
                display: 'inline-block',
                border: 'none',
                background: '#ffffff',
                backgroundColor: '#ddd',
                outline: 'none'
              }}
                value={checkPasswordRegister}
                onChange={(event) => setCheckPasswordRegister(event.target.value)}
                type="password"
                placeholder="******"
                name="password-repeat"
                id="password-repeat"
              />

              <hr />
              <p>
                Để tạo tài khoản vui lòng đồng ý với điều khoản của chúng tôi{" "}
                <a style={{ cursor: "pointer" }} href="#">
                  Terms &amp; Privacy
                </a>
                .
              </p>

              <button
                onClick={handleAddUser}
                type="submit"
                className="submit"
              >
                Đăng ký
              </button>
            </div>
            <div className="register-login">
              <p>
                Bạn đã có tài khoản rồi?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                >
                  Đăng nhập
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Header;
