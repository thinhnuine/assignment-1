import { useToast } from "@chakra-ui/react";
import { Button, message } from "antd";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../UserContext";
import { createApiAdmin } from "../../../services/admin-service";
import "./DetailsInfo.css";

const DetailsInfo = (data) => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [isSold, setIsSold] = useState(false);

  const toast = useToast();
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (color && size) {
      const variant = data.productById.variants.find(
        (variant) => variant.color === color && variant.size === size
      );
      setSelectedVariant(variant);
    }
  }, [color, size, data.productById.variants]);

  const { updateUser } = useUser();

  const handleClick = () => {
    const isAuthenticated = !!localStorage.getItem("user");
    if (!isAuthenticated) {
      return alert("Bạn phải đăng nhập trước");
    }
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const addToCart = async () => {
      try {
        const response = await createApiAdmin().put(
          "http://localhost:8000/user/cart",
          {
            variant: selectedVariant._id,
            quantity,
            action: "addToCart",
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        if (response.data.success) {
          // Xử lý sau khi thêm vào giỏ hàng thành công (nếu cần)
          message.success("Thêm vào giỏ hàng thành công");
        } else {
          throw new Error(
            response?.message || "Thêm vào giỏ hàng không thành công"
          );
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          message.error(error.response.data?.message);
        } else {
          message.error(error?.message);
        }
      }
      updateUser();
    };
    if (selectedVariant) {
      console.log({ variant: selectedVariant._id, quantity: quantity });
      addToCart();
    } else {
      message.error("Chưa chọn color, size");
    }
  };

  useEffect(() => {
    setSalePrice(
      data?.productById?.priceDetail?.price *
        ((100 - data?.productById?.priceDetail?.saleRatio) / 100)
    );
    isSoldCheck();
  }, []);

  const formatNumber = (number) => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  //filter cac variant co cung mau
  const uniqueColors = new Set();
  const filteredVariants = data.productById.variants.filter((variant) => {
    const color = variant.color;
    if (!uniqueColors.has(color)) {
      uniqueColors.add(color);
      return true;
    }
    return false;
  });
  const uniqueSizes = new Set();
  const filteredVariantsBySize = data.productById.variants.filter((variant) => {
    const size = variant.size;
    if (!uniqueSizes.has(size)) {
      uniqueSizes.add(size);
      return true;
    }
    return false;
  });

  useEffect(() => {}, []);

  const inQuantity = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };
  const deQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isSoldCheck = () => {
    if ((data.productById.countInStock = 0)) {
      setIsSold(true);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg">{data.productById.name}</h2>
      <div className="flex mt-1">
        <h1 className="text-[#f81f1f] text-base mr-3">
          {formatNumber(salePrice)}đ
        </h1>
        <h2 className="line-through text-gray-400 text-base">
          {formatNumber(data.productById.priceDetail.price)}đ
        </h2>
      </div>
      <div className="selection-color">
        <p>Màu sắc: {color}</p>
        {filteredVariants.map((variants, index) => (
          <button
            key={index}
            className="selection-input"
            onClick={() => {
              setColor(variants.color);
            }}
          >
            <img src={variants.image} className="color-img "></img>
          </button>
        ))}
      </div>
      <div className="selection-size">
        <p>Kích thước: {size}</p>
        {filteredVariantsBySize.map((variants, index) => (
          <button
            key={index}
            className="selection-input"
            onClick={() => setSize(variants.size)}
          >
            <div className="size">{variants.size}</div>
          </button>
        ))}
      </div>
      <p style={{ color: "#0158DA" }}>+ Hướng dẫn chọn size</p>
      <div className="quantity">
        <p>Số lượng</p>
        <button className="minus-quantity" onClick={deQuantity}>
          -
        </button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min={1}
          max={100}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.min(999, Math.max(1, parseInt(e.target.value, 10)))
            )
          }
        ></input>
        <button className="add-quantity" onClick={inQuantity}>
          +
        </button>
        <p>Còn hàng</p>
      </div>
      <Button
        className="bg-black text-white mt-3"
        size="large"
        type="submit"
        onClick={handleClick}
      >
        THÊM VÀO GIỎ
      </Button>
    </div>
  );
};

export default DetailsInfo;
