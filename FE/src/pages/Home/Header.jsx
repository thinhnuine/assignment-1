import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Drawer, Modal, message } from "antd";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Home.css";
const Header = () => {
  const navigate = new useNavigate();
  const form = useRef();
  const name = JSON.parse(localStorage.getItem("user"));
  const handleOnclick = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const [handleModal, setHandleModal] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [login, setLogin] = useState(true);

  //Login

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useContext(useUser);

  const { updateUser } = useUser();
  const handleLogin = async () => {
    await fetch("http://localhost:8000/user/login", {
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
    }).then((res) =>
      res.json().then((data) => {
        if (data.email === userName) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("id", data.id);
          setHandleModal(!handleModal);
          navigate("/");
          message.success("Đăng nhập thành công!");
        } else {
          message.error("Tài khoản hoặc mật khẩu sai!");
        }
      })
    );
    updateUser();
  };

  const [userNameRegister, setUserNameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [checkPasswordRegister, setCheckPasswordRegister] = useState("");

  const handleAddUser = async () => {
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
      body: JSON.stringify({
        email: userNameRegister,
        password: passwordRegister,
      }), // body data type must match "Content-Type" header
    });

    response.then((res) =>
      res.json().then((data) => {
        if (checkPasswordRegister != passwordRegister) {
          alert("Mật khẩu không trùng khớp!");
          return false;
        } else if (userNameRegister === data.email) {
          alert("Tài khoản đã tồn tại!");
          return false;
        } else {
          setHandleModal(!handleModal);
          alert("Bạn đã lập tài khoản thành công!");
          navigate("/");
        }
      })
    );
  };

  return (
    <>
      <div>
        <div className="bg-[#f5f5f5] py-2.5">
          <div className="container hidden lg:block">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="p-2.5 w-[250px] border border-[#3c3c3]"
              />
              <div className="cursor-pointer  bg-[#545457] text-white px-3 py-2.5  rounded-sm">
                <i className="fa-solid fa-magnifying-glass" />
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
                    <a
                      className="login-header-hover cursor-pointer ml-4"
                      onClick={() => setHandleModal(!handleModal)}
                    >
                      ĐĂNG NHẬP
                    </a>
                  </li>
                )}
              </ul>
              <Badge count={5}>
                <Link href="/cart">
                  <ShoppingCartOutlined className="text-[40px] ml-5 text-red-500 cursor-pointer" />
                </Link>
              </Badge>
            </div>
          </div>
          <div>
            <div className="flex lg:hidden justify-between container">
              <MenuOutlined
                className="text-[20px]"
                onClick={() => setMenuMobile(true)}
              />

              <Link to="/">
                <p className="text-3xl">Mind Clothing Store</p>
              </Link>

              <div className="flex items-center gap-3">
                <div className="cursor-pointer text-[#999] text-[20px]">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <Badge count={5}>
                  <Link href="/cart">
                    <ShoppingCartOutlined className="text-[30px]  text-red-500 cursor-pointer" />
                  </Link>
                </Badge>
              </div>
            </div>
          </div>

          <Drawer
            title="Menu"
            placement={"left"}
            closable={false}
            onClose={() => {
              setMenuMobile(false);
            }}
            open={menuMobile}
          >
            <ul className="">
              <li className="cursor-pointer list-disc">
                <Link to="/">TRANG CHỦ</Link>
              </li>

              <li className="list-disc">
                <Link to="/shop">Tất cả sản phẩm</Link>
              </li>
              <div className="ml-4">
                <li>
                  <Link href="#">Áo Thun</Link>
                </li>
                <li>
                  <Link href="#">Baby Tee</Link>
                </li>
                <li>
                  <Link href="#">Áo Polo</Link>
                </li>
                <li>
                  <Link href="#">Áo sơ mi</Link>
                </li>
                <li>
                  <Link href="#">Áo khoác</Link>
                </li>
                <li>
                  <Link href="#">Hoodie</Link>
                </li>
                <li>
                  <Link href="#">Quần</Link>
                </li>
                <li>
                  <Link href="#">Quần nữ</Link>
                </li>
                <li>
                  <Link href="#">Phụ kiện</Link>
                </li>
              </div>
              <li className="cursor-pointer list-disc">
                <a href>CHÍNH SÁCH ĐỔI TRẢ</a>
              </li>

              <li className="cursor-pointer list-disc">
                <a href>BẢNG SIZE</a>
              </li>
              <li className="cursor-pointer list-disc">
                <a href>HỆ THỐNG CỦA HÀNG</a>
              </li>
            </ul>
          </Drawer>
        </div>

        <header className="container hidden lg:block">
          <ul className="flex container items-center justify-between pt-6 text-lg px-24">
            <li className="cursor-pointer">
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li className="cursor-pointer">
              <a href>CHÍNH SÁCH ĐỔI TRẢ</a>
            </li>
            <li className="cursor-pointer">
              <Link to="/">
                <p className="text-3xl">Mind Clothing Store</p>
              </Link>
            </li>
            <li className="cursor-pointer">
              <a href>BẢNG SIZE</a>
            </li>
            <li className="cursor-pointer">
              <a href>HỆ THỐNG CỦA HÀNG</a>
            </li>
          </ul>
          <Divider />
          <ul className="flex container justify-between items-center px-40 text-base mb-4">
            <li>
              <Link to="/shop">Tất cả sản phẩm</Link>
            </li>
            <li>
              <Link href="#">Áo Thun</Link>
            </li>
            <li>
              <Link href="#">Baby Tee</Link>
            </li>
            <li>
              <Link href="#">Áo Polo</Link>
            </li>
            <li>
              <Link href="#">Áo sơ mi</Link>
            </li>
            <li>
              <Link href="#">Áo khoác</Link>
            </li>
            <li>
              <Link href="#">Hoodie</Link>
            </li>
            <li>
              <Link href="#">Quần</Link>
            </li>
            <li>
              <Link href="#">Quần nữ</Link>
            </li>
            <li>
              <Link href="#">Phụ kiện</Link>
            </li>
          </ul>
        </header>
      </div>
      <Modal
        open={handleModal}
        handleModal={handleModal}
        footer={null}
        width={550}
        onCancel={() => {
          setLogin(true);
          setHandleModal(false);
        }}
      >
        {login ? (
          <div>
            <div className="max-w-[500px] mx-auto">
              <h1
                className="text-3xl font-bold"
                style={{ marginBottom: "10px" }}
              >
                Đăng nhập
              </h1>

              <p>Vui lòng nhập thông tin tài khoản</p>
              <hr />
              <label htmlFor="username" className="mt-2">
                <b>Tên đăng nhập</b>
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
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
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
                }}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="******"
                name="password"
                id="password"
              />

              <hr />
              <Button
                type="primary"
                onClick={handleLogin}
                htmlType="submit"
                className="bg-green-500 w-full "
                size="large"
              >
                Đăng nhập
              </Button>
            </div>
            <p className="text-base mt-1">
              Bạn chưa có tài khoản?{" "}
              <Link className="text-blue-500" onClick={() => setLogin(!login)}>
                Đăng ký
              </Link>
              .
            </p>
          </div>
        ) : (
          <div ref={form}>
            <div className="register">
              <h1 className="text-3xl font-bold">Đăng ký</h1>
              <p>Vui lòng điền thông tin để đăng ký</p>
              <hr />

              <label htmlFor="username" className="mt-2">
                <b>Tên đăng nhập</b>
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
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
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
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
                  width: "100%",
                  padding: "15px",
                  margin: "10px 0 22px 0",
                  display: "inline-block",
                  border: "none",
                  background: "#ffffff",
                  backgroundColor: "#ddd",
                  outline: "none",
                }}
                value={checkPasswordRegister}
                onChange={(event) =>
                  setCheckPasswordRegister(event.target.value)
                }
                type="password"
                placeholder="******"
                name="password-repeat"
                id="password-repeat"
              />

              <hr />
              <p className="mt-1 text-sm">
                Để tạo tài khoản vui lòng đồng ý với điều khoản của chúng tôi{" "}
                <Link className="text-blue-500">Terms &amp; Privacy</Link>.
              </p>

              <Button
                type="primary"
                onClick={handleAddUser}
                htmlType="submit"
                className="bg-green-500 w-full "
                size="large"
              >
                Đăng ký
              </Button>
            </div>
            <p className="mt-1 text-sm">
              Bạn đã có tài khoản rồi?{" "}
              <Link
                className="text-blue-500"
                style={{ cursor: "pointer" }}
                onClick={() => setLogin(!login)}
              >
                Đăng nhập
              </Link>
              .
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Header;
