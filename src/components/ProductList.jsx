import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plantCategories = [
  {
    category: "Indoor Plants",
    items: [
      { id: 1, name: "Aloe Vera", price: 12.99, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
      { id: 2, name: "Snake Plant", price: 14.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411" },
      { id: 3, name: "Peace Lily", price: 16.99, image: "https://images.unsplash.com/photo-1463320726281-696a485928c7" },
      { id: 4, name: "Spider Plant", price: 11.99, image: "https://images.unsplash.com/photo-1524594154908-edd48d90d87b" },
      { id: 5, name: "ZZ Plant", price: 18.99, image: "https://images.unsplash.com/photo-1593691509543-c55fb32bcae4" },
      { id: 6, name: "Rubber Plant", price: 19.99, image: "https://images.unsplash.com/photo-1616627980169-1f0db6c6c75b" },
    ],
  },
  {
    category: "Outdoor Plants",
    items: [
      { id: 7, name: "Rose", price: 9.99, image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322" },
      { id: 8, name: "Lavender", price: 8.99, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
      { id: 9, name: "Hibiscus", price: 13.99, image: "https://images.unsplash.com/photo-1508747703725-719777637510" },
      { id: 10, name: "Bougainvillea", price: 15.99, image: "https://images.unsplash.com/photo-1592159945470-2c1f7f94f66d" },
      { id: 11, name: "Jasmine", price: 10.99, image: "https://images.unsplash.com/photo-1524594154908-edd48d90d87b" },
      { id: 12, name: "Gardenia", price: 14.99, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Plant Collection</h1>

      {plantCategories.map((cat) => (
        <div key={cat.category}>
          <h2>{cat.category}</h2>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {cat.items.map((plant) => (
              <div
                key={plant.id}
                style={{
                  width: "220px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{ width: "100%", height: "140px", objectFit: "cover" }}
                />
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>
                <button
                  onClick={() => dispatch(addItem(plant))}
                  disabled={isInCart(plant.id)}
                >
                  {isInCart(plant.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
