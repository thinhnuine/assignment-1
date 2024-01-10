import "./SimilarProducts.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function SimilarProducts() {

  const [productData, setProductData] = useState([]);
  
  useEffect(  () => {
     axios.get('http://localhost:8000/product')
    .then(response => setProductData(response.data.products))
    .catch(error => console.error('Error:', error));
  },[]);
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
    />
  ));

  return (
    <div className="similarProducts">
      <h1>Sản phẩm tương tự</h1>
      <br/>
      <Carousel responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}