import React from "react";

export default function Product(props) {

  const handleClick = () => {
    const isAuthenticated = !!localStorage.getItem("user");

    if (!isAuthenticated) {
      alert("Bạn phải đăng nhập trước")
      return;
    }

    props.onAddToCart(props.item)
  }

  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="product_image" />
      <h4>{props.name}</h4>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p>
        <button onClick={handleClick}>Add to Cart</button>
      </p>
    </div>
  );
}