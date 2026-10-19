import { Link } from "react-router-dom";

function OrderSuccess() {
  const savedOrder = localStorage.getItem(
    "nova-last-order"
  );

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  if (!order) {
    return (
      <section className="order-success-empty">
        <h1>No order found</h1>

        <p>
          We couldn't find your recent order.
        </p>

        <Link
          to="/products"
          className="order-success-button"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="order-success-page">

      <div className="order-success-card">

        <div className="order-success-icon">
          ✓
        </div>

        <p className="eyebrow">
          ORDER CONFIRMED
        </p>

        <h1>
          Thank you for your order,
          <br />
          {order.customer.firstName}!
        </h1>

        <p className="order-success-message">
          Your order has been successfully placed.
          We've received your order and will prepare
          it for shipping.
        </p>

        <div className="order-number">
          <span>Order number</span>

          <strong>
            {order.orderNumber}
          </strong>
        </div>

        <div className="order-success-details">

          <div className="success-detail">
            <span>Contact</span>

            <strong>
              {order.customer.email}
            </strong>
          </div>

          <div className="success-detail">
            <span>Shipping to</span>

            <strong>
              {order.shipping.city},{" "}
              {order.shipping.state}
            </strong>
          </div>

          <div className="success-detail">
            <span>Total</span>

            <strong>
              ${order.total.toFixed(2)}
            </strong>
          </div>

        </div>

        <div className="order-success-actions">

          <Link
            to="/products"
            className="order-success-button"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="order-success-home"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </section>
  );
}

export default OrderSuccess;