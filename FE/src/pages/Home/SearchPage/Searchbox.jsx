import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Searchbox = ({ notFound }) => {
  let [_, setSearchParams] = useSearchParams();

  const [queryValue, setQueryValue] = useState("");

  function handleSearch() {
    setSearchParams({ query: queryValue });
  }

  function handleChange(event) {
    setQueryValue(event.target.value);
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="container my-10">
      <div className="flex flex-col items-center">
        {notFound ? (
          <>
            <h1 className="py-3 text-center text-3xl font-semibold font-futura mb-3">
              Không tìm thấy bất kỳ kết quả nào với từ khóa trên.
            </h1>
            <div className="text-center mb-2 font-futura">Vui lòng nhập từ khóa tìm kiếm khác</div>
          </>
        ) : (
          <h1 className="py-3 text-center text-3xl font-semibold font-futura mb-3">
            Nhập từ khóa để tìm kiếm
          </h1>
        )}
        <div className="w-full lg:w-2/3 2xl:w-1/2 mb-3 flex">
          <input
            className="flex-1 text-[##1c1c1c] border border-[#e5e5e5] py-1 px-3 focus:outline-none"
            type="text"
            onChange={handleChange}
            placeholder="Bạn cần tìm gì?"
            onKeyDown={handleKeyDown}
          />
          <button className="h-10 bg-black text-white font-futura px-2" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbox;
