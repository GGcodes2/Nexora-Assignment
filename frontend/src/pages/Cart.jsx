import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/cart");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/cart/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.cart); // refresh cart
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleCheckoutChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!checkoutData.name || !checkoutData.email || !checkoutData.address) {
      setMessage("❌ Please fill all checkout fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checkoutData }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        setShowCheckout(false);
        setCheckoutData({ name: "", email: "", address: "" });
        fetchCart(); // refresh cart
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Error placing order");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your cart...</p>;

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-center mt-10">🛒 Your cart is empty</p>;
  }

  const total = cart.products.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      <ul className="space-y-4">
        {cart.products.map((item) => (
          <li key={item._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{item.productId.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.productId.price} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold">
                ₹{item.productId.price * item.quantity}
              </p>
              <button
  onClick={() => handleRemoveItem(item.productId._id)}
  className="text-red-500 hover:underline"
>
  Remove
</button>

            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <p className="text-lg font-bold">Total:</p>
        <p className="text-lg font-bold text-green-600">₹{total}</p>
      </div>

      {!showCheckout ? (
        <button
          onClick={() => setShowCheckout(true)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
        >
          Checkout
        </button>
      ) : (
        <div className="mt-6 border p-4 rounded-lg space-y-3 bg-gray-50">
          <h2 className="text-lg font-bold">Checkout Form</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={checkoutData.name}
            onChange={handleCheckoutChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={checkoutData.email}
            onChange={handleCheckoutChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={checkoutData.address}
            onChange={handleCheckoutChange}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
          >
            Place Order
          </button>
          <button
            onClick={() => setShowCheckout(false)}
            className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default Cart;
