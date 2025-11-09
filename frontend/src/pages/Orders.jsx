import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/orders");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-sm">
          <p className="font-semibold text-gray-700 mb-2">
            🆔 Order ID: {order._id}
          </p>
          <ul className="mb-2">
            {order.products.map((item) => (
              <li key={item._id} className="flex justify-between text-sm">
                <span>{item.productId.name}</span>
                <span>₹{item.productId.price} × {item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total: ₹{order.totalAmount}</p>
          <p className="text-sm text-gray-500">Status: {order.status}</p>
          <p className="text-xs text-gray-400">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
