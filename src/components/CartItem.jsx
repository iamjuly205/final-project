import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();

  // Nếu CartSlice của bạn dùng state.cart.items thì giữ như này.
  // Nếu bạn dùng state.cart.cart thì đổi thành: state.cart.cart
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrease = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrease = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: "6px 0" }}>${item.price.toFixed(2)}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => handleDecrease(item.id, item.quantity)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrease(item.id, item.quantity)}>
              +
            </button>
          </div>

          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>
        Total Amount: ${totalAmount.toFixed(2)}
      </h3>
    </div>
  );
};

export default CartItem;
