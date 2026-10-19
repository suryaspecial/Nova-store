import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

function Navbar() {
  const { cartCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          <Link to="/" className="navbar-logo">
            NOVA.
          </Link>

          <nav className="navbar-links">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>
          </nav>

          <button
             className="cart-link"
             onClick={() => setIsCartOpen(true)}
             aria-label={`Open shopping cart${
             cartCount > 0 ? `, ${cartCount} items` : ""
              }`}
            >
             Cart

            {cartCount > 0 && (
            <span className="cart-count" aria-hidden="true">
            {cartCount}
            </span>
              )}
          </button>

        </div>
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default Navbar;