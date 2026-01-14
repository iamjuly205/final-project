import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const products = [
  {
    id: 1,
    name: "Aloe Vera",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 15.0,
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Our Plants</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              width: "220px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "140px", objectFit: "cover" }}
            />
            <h3 style={{ margin: "10px 0 6px" }}>{p.name}</h3>
            <p style={{ margin: "0 0 10px" }}>${p.price.toFixed(2)}</p>

            <button
              onClick={() => handleAddToCart(p)}
              disabled={isInCart(p.id)}
              style={{
                width: "100%",
                padding: "10px",
                cursor: isInCart(p.id) ? "not-allowed" : "pointer",
              }}
            >
              {isInCart(p.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
