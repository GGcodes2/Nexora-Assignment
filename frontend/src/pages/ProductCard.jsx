const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
    <img src={product.image} alt={product.name} className="h-40 w-40 object-cover rounded-md mb-3" />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-600">₹{product.price}</p>
    <button
      onClick={() => onAddToCart(product)}
      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  </div>
);
