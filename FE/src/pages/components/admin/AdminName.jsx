import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminName = () => {
  const items = [
    {
      label: "Log Out",
      key: "1",
    },
  ];

  const navigate = new useNavigate();
  const onClick = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
    >
      <Space>
        Username
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};
export default AdminName;
