import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">🛍️ Nexora Shop</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/cart" className="hover:text-gray-200">Cart</Link>
        <Link to="/orders" className="hover:text-gray-200">Orders</Link>
      </div>
    </nav>
  );
};

export default Navbar;
