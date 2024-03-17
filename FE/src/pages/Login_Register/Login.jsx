import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   fetch("https://6485ce2fa795d24810b75652.mockapi.io/api/v1/array-user")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);

  //       // setUser(data);
  //       setData(data);
  //     });
  // }, []);

  const handleLogin = () => {
    const response = fetch("http://localhost:8000/admin/login", {
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
    });
    response.then((res) =>
      res.json().then((data) => {
        if (data.email === userName) {
          localStorage.setItem("user/admin", JSON.stringify(data));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.refreshToken)
          );
          localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
          localStorage.setItem("id", JSON.stringify(data.id));

          message.success("Đăng nhập thành công!");
          navigate("/admin");
        } else {
          message.error("Tài khoản của bạn không phải admin");
        }
      })
    );
  };

  return (
    <div>
      <div className="login container mt-20 max-w-[700px]">
        <h1 className="text-xl font-bold">Đăng nhập</h1>
        <hr className="mt-4" />
        <label htmlFor="username" className="mt-3">
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
          onClick={handleLogin}
          htmlType="submit"
          size="large"
          className="bg-green-500 mt-2 w-full"
          type="primary"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

export default Login;
