import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
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
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
            gap: "10px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)}</p>
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

          <button
            onClick={() => handleRemove(item.id)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>
        Total: ${totalPrice.toFixed(2)}
      </h3>
    </div>
  );
};

export default CartItem;
