
import { Link } from "react-router-dom";
import "./Footer.css";
import {FaInstagram,FaFacebookF,FaPinterestP,} from "react-icons/fa";

function Footer() {
  return (
    <footer className="nova-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            NOVA<span>.</span>
          </Link>

          <p className="footer-description">
            Everyday products. Better shopping.
            Thoughtfully selected essentials to make
            your everyday life a little better.
          </p>

          
           <div className="footer-socials">
             <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              >
            <FaInstagram />
            </a>

             <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
             >
            <FaFacebookF />
            </a>

            <a
             href="https://www.pinterest.com/"
             target="_blank"
             rel="noreferrer"
             aria-label="Pinterest"
            >
            <FaPinterestP />
            </a>
            </div>

        </div>

        {/* Shop links */}
        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/products">All Products</Link>
          <Link to="/products?category=beauty">Beauty</Link>
          <Link to="/products?category=fragrances">Fragrances</Link>
          <Link to="/products?category=furniture">Furniture</Link>
          <Link to="/products?category=groceries">Groceries</Link>
        </div>

        {/* Customer support */}
        <div className="footer-column">
          <h3>Customer Care</h3>

          <Link to="/cart">Shopping Cart</Link>
          <Link to="/products">Continue Shopping</Link>
          <Link to="/checkout">Checkout</Link>
          <a href="mailto:support@nova.store">
            Contact Support
          </a>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Get in Touch</h3>

          <p>
            Have a question? We'd love to hear from you.
          </p>

          <a href="mailto:support@nova.store">
            support@nova.store
          </a>

          <p className="footer-location">
            Here for your everyday essentials.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NOVA.
          All rights reserved.
        </p>

        <div className="footer-legal">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <a href="mailto:support@nova.store">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
