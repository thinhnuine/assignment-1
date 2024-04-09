import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import SearchResults from "./SearchResults";
import Searchbox from "./Searchbox";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryData = searchParams.get("query");

  function handleFetchProduct(queryData) {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/product?search=${queryData}`)
      .then(response => {
        setListProducts(response.data.products);
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (queryData) {
      handleFetchProduct(queryData);
    }
  }, [queryData]);

  return (
    <>
      <Header />
      <section className="">
        {queryData && listProducts && listProducts.length > 0 ? (
          <SearchResults listProducts={listProducts} />
        ) : (
          <Searchbox
            notFound={!isLoading && queryData && (!listProducts || listProducts.length === 0)}
          />
        )}
      </section>
      <Footer />
    </>
  );
};

export default SearchPage;
