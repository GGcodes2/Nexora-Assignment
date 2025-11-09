import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Fetch products from your backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Add item to cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:5001/api/cart", {
        productId: product._id,
      });
      alert(`${product.name} added to cart 🛒`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🛍️ Products</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-3">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
