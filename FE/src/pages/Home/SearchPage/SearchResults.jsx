import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Shop.css";

const SearchResults = ({ listProducts }) => {
  const [searchParams] = useSearchParams();
  const queryData = searchParams.get("query");

  const formatNumber = number => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="container">
      <h2 className="text-center font-futura py-2 text-3xl font-semibold ">
        Tìm thấy {listProducts.length} kết quả với từ khóa "{queryData}"
      </h2>
      <div className="product">
        {listProducts.map(prod => (
          <div className="containerz" key={prod.id}>
            <div className="flex justify-center">
              <img src={prod.thumbnail} alt="#" className="w-[70%]" />
            </div>
            <Link to={`/detail/${prod._id}`}>
              <p className="lg:text-lg text-base">{prod.name}</p>
            </Link>
            {/* <p className="name">{prod.category.name}</p> */}
            <div className="flex justify-center">
              <div className="flex justify-between w-[70%] flex-col xl:flex-row">
                <h4 className="lg:text-xl">
                  {(prod.priceDetail &&
                    formatNumber(
                      prod.priceDetail?.price * ((100 - prod?.priceDetail?.saleRatio) / 100)
                    )) ||
                    "0"}
                  đ
                </h4>
                {prod.priceDetail && (
                  <del className="delete lg:text-xl">{prod?.priceDetail?.price}đ</del>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
