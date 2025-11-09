import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Wireless Headphones", price: 2499 },
  { name: "Bluetooth Speaker", price: 1599 },
  { name: "Smart Watch", price: 3499 },
  { name: "Gaming Mouse", price: 1299 },
  { name: "Mechanical Keyboard", price: 2999 },
  { name: "Power Bank 20000mAh", price: 1999 },
  { name: "LED Monitor 24inch", price: 7499 },
  { name: "USB-C Charger 65W", price: 1799 },
  { name: "Phone Tripod Stand", price: 899 },
  { name: "Noise Cancelling Earbuds", price: 2799 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Database seeded with mock products");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
