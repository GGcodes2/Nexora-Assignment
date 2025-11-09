import React from "react";

const Cart = ({ cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <div>
                  <span className="mr-4">₹{item.price * item.qty}</span>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-3" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button
            onClick={onCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
