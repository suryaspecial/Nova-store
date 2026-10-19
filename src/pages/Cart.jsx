import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <p className="eyebrow">YOUR CART</p>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link to="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="cart-header">
        <div>
          <p className="eyebrow">YOUR CART</p>
          <h1>Shopping Cart</h1>
        </div>

        <span>
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="cart-layout">

        {/* Cart Items */}

        <div className="cart-items">

          {cartItems.map((item) => (
            <article
              key={item.id}
              className="cart-item"
            >

              <div className="cart-item-image">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    onError={(event) => {
                     event.currentTarget.src = item.images?.[0];
                     }}
                   />
              </div>

              <div className="cart-item-info">

                <p className="cart-item-category">
                  {item.category}
                </p>

                <h2>{item.title}</h2>

                <p className="cart-item-price">
                  ${item.price}
                </p>

                <div className="cart-item-actions">

                  <div className="quantity-selector">

                    <button
                      type="button"
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
                      type="button"
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
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

            </article>
          ))}

          <button
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

        {/* Cart Summary */}

        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

        </aside>

      </div>

    </section>
  );
}

export default Cart;