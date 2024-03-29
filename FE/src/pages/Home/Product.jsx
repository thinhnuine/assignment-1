import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  const formatNumber = (number) => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 container">
        {products.map((data) => (
          <div
            className="w-[] p-2.5 m-2.5 text-center border border-[#ddd] rounded-lg"
            key={data.id}
          >
            <Link to={`/detail/${data._id}`}>
              <img src={data.thumbnail} alt="#" />
            </Link>
            <Link to={`/detail/${data._id}`}>
              <p>{data.name}</p>
            </Link>
            <p className="name">{data.category.name}</p>
            <div className="price-math">
              <h4>
                {(data.priceDetail &&
                  formatNumber(
                    data.priceDetail?.price *
                      ((100 - data?.priceDetail.saleRatio) / 100)
                  )) ||
                  "0"}
                đ
              </h4>
              {data.priceDetail && (
                <del className="delete">{data.priceDetail.price}đ</del>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
