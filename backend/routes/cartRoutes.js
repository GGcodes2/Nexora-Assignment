import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ GET /api/cart – fetch cart for mock user
router.get("/", async (req, res) => {
  try {
    const userId = "mock_user";
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.json({ cart: { userId, products: [] } });

    res.json({ cart });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// ✅ DELETE /api/cart/:productId – remove a product from the cart
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = "mock_user";

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove the product
    const initialLength = cart.products.length;
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.products.length === initialLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (err) {
    console.error("Error removing product:", err);
    res.status(500).json({ message: "Error removing product" });
  }
});

// ✅ POST /api/cart – add product to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = "mock_user";

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

export default router;
