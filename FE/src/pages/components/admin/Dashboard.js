import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Card,
  Popconfirm,
  Radio,
  Space,
  Statistic,
  Table,
  Typography,
} from "antd";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { createApiAdmin } from "../../../services/admin-service";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [statistical, setStatistical] = useState(2);

  useEffect(() => {
    createApiAdmin()
      .get("http://localhost:8000/user")
      .then((response) => setCustomers(response.data.countUser))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiAdmin()
      .get("http://localhost:8000/admin/order/all")
      .then((response) => setOrders(response.data.orders.length))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiAdmin()
      .get("http://localhost:8000/product")
      .then((response) => setInventory(response.data.products.length))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiAdmin()
      .get("http://localhost:8000/admin/order-year?year=2023")
      .then((response) => setRevenue(response.data.sumTotal))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Space size={30} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space size={80} direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue (VND)"}
          value={revenue}
        />
      </Space>
      <Space>
        <h3>Thống kê: </h3>
        <Radio.Group
          value={statistical}
          onChange={(e) => setStatistical(e.target.value)}
        >
          <Radio.Button value={1}>Yearly</Radio.Button>
          <Radio.Button value={2}>Monthly</Radio.Button>
          <Radio.Button value={3}>Daily</Radio.Button>
        </Radio.Group>
      </Space>
      <Space size={100} direction="horizontal">
        {statistical === 2 ? <DashboardChart /> : null}
        {statistical === 2 ? <RevenueChart /> : null}
        {statistical === 1 ? <YearlyOrderChart /> : null}
        {statistical === 1 ? <YearlyRevenueChart /> : null}
        {statistical === 3 ? <DailyOrderChart /> : null}
        {statistical === 3 ? <DailyRevenueChart /> : null}
      </Space>
      <Space size={100} direction="horizontal">
        {statistical === 3 ? <DailyUserChart /> : null}
        {statistical === 1 ? <YearlyUserChart /> : null}
        {statistical === 2 ? <MonthlyUserChart /> : null}
        <RecentOrders />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };

  useEffect(() => {
    createApiAdmin()
      .get(`http://localhost:8000/admin/order-today`)
      .then((response) => setOrders(response.data.orderToday))
      .catch((error) => console.error("Error:", error));
  }, []);
  const deleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast({
        status: "success",
        title: "Xoá đơn hàng thành công",
        position: "top",
      });
      setOrders(orders.filter((item) => item._id != id));
    } catch (error) {
      toast({
        status: "error",
        title: "Delete order failed",
        position: "top",
      });
    }
  };
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (value) => (
          <>
            <img
              width={40}
              height={40}
              src={value}
              onError={(e) =>
                (e.target.src =
                  "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
              }
            />
          </>
        ),
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={record.orderDetail}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Pay",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) => <a>{text === false ? "Un Paid" : "Paid"}</a>,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={() => {}}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>Recently orders</h3>
      {orders && (
        <Table
          columns={columns}
          dataSource={transformData(orders)}
          expandable={{ expandedRowRender }}
        />
      )}
    </>
  );
}

function DashboardChart() {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Orders",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-month?month=${month}`
        );
        const result = response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.countOrderMonth || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
}

const RevenueChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Revenue",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-month?month=${month}`
        );
        const result = await response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.sumTotal || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
};

const YearlyRevenueChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Revenue",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.sumTotal || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};
const YearlyOrderChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Orders",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.countOrderYear || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};
const DailyRevenueChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh Thu",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = today.getDate(); // Lấy ngày hiện tại
      const days = Array.from({ length: 7 }, (_, index) => currentDay - index);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Revenue",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.sumTotal || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};
const DailyOrderChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = today.getDate(); // Lấy ngày hiện tại
      const days = Array.from({ length: 7 }, (_, index) => currentDay - index);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Order",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/order-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.countOrderToday || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};
const DailyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = today.getDate(); // Lấy ngày hiện tại
      const days = Array.from({ length: 7 }, (_, index) => currentDay - index);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/user-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.countNewUsersDay || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Người Dùng Mới Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};
const YearlyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "User",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/user-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.countNewUsersDay || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Người Dùng Mới Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};

const MonthlyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "User",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiAdmin().get(
          `http://localhost:8000/admin/user-month?month=${month}`
        );
        const result = await response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.countNewUsersDay || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Ngừoi Dùng Mới Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
};
export default Dashboard;
