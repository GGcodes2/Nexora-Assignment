import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ Place a new order
router.post("/", async (req, res) => {
  try {
    const userId = "mock_user";

    // Find user's cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    // Create new order
    const newOrder = new Order({
      userId,
      products: cart.products,
      totalAmount,
    });

    await newOrder.save();

    // Clear cart after placing order
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "✅ Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all orders for user
router.get("/", async (req, res) => {
  try {
    const userId = "mock_user";
    const orders = await Order.find({ userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
