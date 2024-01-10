import React, { useState, useEffect } from "react";
import "./assets/CSS/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [user, setUser] = useState([]);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleAddUser = () => {
    const newUser = {
      userName: userName,
      password: password,
      password2: password2,
    };

    if (userName == "") {
      alert("Yêu cầu nhập tên đăng nhập!");
      return false;
    } else if (password.length < 6) {
      alert("Cần nhập ít nhất 6 ký tự!");
      return false;
    } else if (password2 != password) {
      alert("Mật khẩu không trùng khớp!");
      return false;
    } else {
    }

    let passcheck = checkPasswordStrength(password);
    if (!passcheck.success) {
      alert(passcheck.message);
      // return result;
    }

    setUser([...user, newUser]);

    fetch("https://6485ce2fa795d24810b75652.mockapi.io/api/v1/array-user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          alert("Bạn đã lập tài khoản thành công!");
          navigate("/");
          return res.json();
        }
        // handle error
      })
      .catch((error) => {
        alert("Đang có lỗi của hệ thống!");
      });

    function checkPasswordStrength(value) {
      const result = {
        success: true,
        message: "",
      };
      // Initialize variables
      var strength = 0;
      var tips = "";

      // Check password length
      if (value.length < 6) {
        tips += "Làm cho mật khẩu dài hơn. ";
      } else {
        strength += 1;
      }

      // Check for mixed case
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
        strength += 1;
      } else {
        tips += "Sử dụng cả chữ thường và chữ in hoa. ";
      }

      // Check for numbers
      if (value.match(/\d/)) {
        strength += 1;
      } else {
        tips += "Bao gồm ít nhất một số. ";
      }

      // Check for special characters
      if (value.match(/[^a-zA-Z\d]/)) {
        strength += 1;
      } else {
        tips += "Bao gồm ít nhất một ký tự đặc biệt. ";
      }

      result.message = tips;
      result.success = strength >= 3;
      return result;

      // // Return results
      // if (strength < 2) {
      //   return "Dễ đoán. " + tips;
      // } else if (strength === 2) {
      //   return "Độ khó trung bình. " + tips;
      // } else if (strength === 3) {
      //   return "Khó đoán " + tips;
      // } else {
      //   return "Cực kỳ khó khăn. " + tips;
      // }
    }
  };

  return (
    <div>
      <div className="register">
        <h1>Đăng ký</h1>
        <p>Vui lòng điền thông tin để đăng ký</p>
        <hr />

        <label htmlFor="username">
          <b>Tên đăng nhập</b>
        </label>
        <input
          value={userName}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="******"
          name="password"
          id="password"
        />

        <label htmlFor="password-repeat">
          <b>Nhập lại mật khẩu</b>
        </label>
        <input
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          type="password"
          placeholder="******"
          name="password-repeat"
          id="password-repeat"
        />

        <hr />
        {/* <p>
          Để tạo tài khoản vui lòng đồng ý với điều khoản của chúng tôi{" "}
          <a href="#">Terms &amp; Privacy</a>.
        </p> */}

        <button onClick={handleAddUser} type="submit" className="submit">
          Đăng ký
        </button>
      </div>
      <div className="register-login">
        <p>
          Bạn đã có tài khoản rồi? <Link to="/login">Đăng nhập</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
