import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-drawer-overlay"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <aside
        className={`cart-drawer ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div>
            <h2>Your Cart</h2>
            <span>
              {cartCount}{" "}
              {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            className="cart-drawer-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-drawer-content">

          {cartItems.length === 0 ? (
            <div className="cart-drawer-empty">
              <p>Your cart is empty.</p>

              <Link
                to="/products"
                className="drawer-shopping-link"
                onClick={onClose}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-drawer-items">

              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="drawer-item"
                >

                  <div className="drawer-item-image">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </div>

                  <div className="drawer-item-info">

                    <h3>{item.title}</h3>

                    <p className="drawer-item-price">
                      ${item.price}
                    </p>

                    <div className="drawer-item-actions">

                      <div className="drawer-quantity">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 1}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          disabled={
                            item.quantity === item.stock
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        className="drawer-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                </article>
              ))}

            </div>
          )}

        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">

            <div className="drawer-subtotal">
              <span>Subtotal</span>

              <strong>
                ${cartTotal.toFixed(2)}
              </strong>
            </div>

            <Link
              to="/cart"
              className="drawer-view-cart"
              onClick={onClose}
            >
              View Cart
            </Link>

            <Link
              to="/checkout"
              className="drawer-checkout"
              onClick={onClose}
            >
              Checkout
            </Link>

          </div>
        )}

      </aside>
    </>
  );
}

export default CartDrawer;