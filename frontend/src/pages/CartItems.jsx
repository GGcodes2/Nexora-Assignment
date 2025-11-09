// src/pages/CartItems.jsx
import React from "react";

const CartItems = ({ cart, onRemoveFromCart }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{item.name}</span>
            <span>₹{item.price}</span>
            <button
              onClick={() => onRemoveFromCart(item._id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
