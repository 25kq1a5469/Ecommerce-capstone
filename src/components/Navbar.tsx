import { Link } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
}

function Navbar({ cartCount }: NavbarProps) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        NeuraForge
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart 🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;