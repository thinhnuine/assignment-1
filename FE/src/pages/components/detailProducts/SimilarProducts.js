import "./SimilarProducts.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useUser } from "../../../UserContext";

export default function SimilarProducts() {
  const { updateUser } = useUser()

  const [productData, setProductData] = useState([]);

  const handleAddToCart = (productItem) => {
    const isAuthenticated = !!localStorage.getItem("user");
    if (!isAuthenticated) {
      return alert("Bạn phải đăng nhập trước");
    }
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const addToCart = async () => {
      const variantId = productItem.variants[0]._id
      try {
        const response = await axios.put(
          "http://localhost:8000/user/cart",
          {
            variant: variantId,
            quantity: 1,
            action: 'addToCart'
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          // Xử lý sau khi thêm vào giỏ hàng thành công (nếu cần)
          message.success("Thêm vào giỏ hàng thành công")
        } else {
          console.error("Có lỗi khi thêm vào giỏ hàng:", response.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API addVariantToCart:", error.message);
      }
      updateUser();
    };

    addToCart();

  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((response) => setProductData(response.data.products))
      .catch((error) => console.error("Error:", error));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const product = productData.map((item) => (
    <Product
      name={item.name}
      url={item.thumbnail}
      price={item.detailProduct.material}
      description={item.description}
      item={item}
      onAddToCart={handleAddToCart}
    />
  ));

  return (
    <div className="similarProducts">
      <h1>Sản phẩm tương tự</h1>
      <br />
      <Carousel responsive={responsive}>{product}</Carousel>
    </div>
  );
}
