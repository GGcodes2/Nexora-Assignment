import express from "express";
import Product from "../models/Product.js";
import axios from "axios";

const router = express.Router();

// ✅ GET /api/products – Fetch products (DB or fallback)
router.get("/", async (req, res) => {
  try {
    let products = await Product.find({});

    // 🔁 Fallback: If DB empty, fetch from Fake Store API
    if (products.length === 0) {
      const { data } = await axios.get("https://fakestoreapi.com/products");

      const formatted = data.map((item) => ({
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
      }));

      products = await Product.insertMany(formatted);
    }

    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

export default router;
