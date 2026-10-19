import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const {
  cartItems,
  cartTotal,
  clearCart,
 } = useCart();

const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleCustomerSubmit(event) {
    event.preventDefault();

    setCurrentStep(2);
  }

  function handleShippingSubmit(event) {
    event.preventDefault();

    setCurrentStep(3);
  }

  function goBackToCustomer() {
    setCurrentStep(1);
  }

  function goBackToShipping() {
    setCurrentStep(2);
  }
  function handlePlaceOrder() {
  const orderNumber = `NOVA-${Date.now()
    .toString()
    .slice(-8)}`;

  const order = {
    orderNumber,
    customer: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
    shipping: {
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    },
    items: cartItems,
    subtotal: cartTotal,
    shipping: 0,
    total: cartTotal,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    "nova-last-order",
    JSON.stringify(order)
  );

  clearCart();

  navigate("/order-success");
}
  if (cartItems.length === 0) {
    return (
      <section className="checkout-empty">
        <h1>Your cart is empty</h1>

        <p>
          Add some products before continuing
          to checkout.
        </p>

        <Link
          to="/products"
          className="checkout-shop-link"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">

      {/* Header */}
      <div className="checkout-header">
        <p className="eyebrow">
          NOVA CHECKOUT
        </p>

        <h1>Complete your order</h1>

        <p>
          Enter your information to continue.
        </p>
      </div>
      <div className="checkout-progress">

        <div
        className={`checkout-progress-step ${
          currentStep >= 1 ? "active" : ""
         }`}
          >
          <span>01</span>
          <p>Customer</p>
          </div>

          <div
             className={`checkout-progress-line ${
             currentStep >= 2 ? "active" : ""
             }`}
            ></div>

           <div
               className={`checkout-progress-step ${
               currentStep >= 2 ? "active" : ""
              }`}
              >
              <span>02</span>
              <p>Shipping</p>
           </div>

           <div
             className={`checkout-progress-line ${
             currentStep >= 3 ? "active" : ""
              }`}
            ></div>

           <div
              className={`checkout-progress-step ${
               currentStep >= 3 ? "active" : ""
             }`}
             >
              <span>03</span>
              <p>Review</p>
           </div>

      </div>

      <div className="checkout-layout">

        {/* Checkout form */}
        <div className="checkout-form-container">

          {/* STEP 1 */}
          <div
            className={`checkout-section ${
              currentStep !== 1
                ? "checkout-section-completed"
                : ""
            }`}
          >
            <div className="checkout-section-heading">
              <span>
                {currentStep > 1 ? "✓" : "01"}
              </span>

              <div>
                <h2>Customer information</h2>

                <p>
                  Tell us how we can contact you.
                </p>
              </div>
            </div>

            {currentStep === 1 && (
              <form
                id="customer-form"
                onSubmit={handleCustomerSubmit}
              >
                <div className="checkout-form-grid">

                  <div className="checkout-field">
                    <label htmlFor="firstName">
                      First name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="lastName">
                      Last name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="email">
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="phone">
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                </div>
                <div className="checkout-form-actions">
                  <button
                    type="submit"
                    className="checkout-primary-button"
                  >
                   Continue to Shipping →
                 </button>
                </div>
              </form>
            )}

            {currentStep > 1 && (
              <div className="checkout-completed-info">
                <p>
                  {formData.firstName}{" "}
                  {formData.lastName}
                </p>

                <p>
                  {formData.email}
                </p>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* STEP 2 */}
          <div
            className={`checkout-section ${
              currentStep !== 2
                ? "checkout-section-disabled"
                : ""
            }`}
          >
            <div className="checkout-section-heading">
              <span>02</span>

              <div>
                <h2>Shipping information</h2>

                <p>
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            {currentStep === 2 && (
              <form
                id="shipping-form"
                onSubmit={handleShippingSubmit}
              >
                <div className="checkout-form-grid">

                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="address">
                      Street address
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="apartment">
                      Apartment, suite, etc.
                      <span> Optional</span>
                    </label>

                    <input
                      id="apartment"
                      name="apartment"
                      type="text"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Apartment 4B"
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="city">
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Kochi"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="state">
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Kerala"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="postalCode">
                      Postal code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="682001"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="country">
                      Country
                    </label>

                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select country
                      </option>

                      <option value="India">
                        India
                      </option>

                      <option value="United States">
                        United States
                      </option>

                      <option value="United Kingdom">
                        United Kingdom
                      </option>

                      <option value="Canada">
                        Canada
                      </option>

                      <option value="Australia">
                        Australia
                      </option>

                      <option value="Germany">
                        Germany
                      </option>

                      <option value="France">
                        France
                      </option>
                    </select>
                  </div>

                </div>

                <div className="checkout-form-actions">

                  <button
                    type="button"
                    className="checkout-secondary-button"
                    onClick={goBackToCustomer}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="checkout-primary-button"
                  >
                    Continue to Review →
                  </button>

                </div>
              </form>
            )}
          </div>

          {/* STEP 3 */}
          <div
            className={`checkout-section ${
              currentStep !== 3
                ? "checkout-section-disabled"
                : ""
            }`}
          >
            <div className="checkout-section-heading">
              <span>03</span>

              <div>
                <h2>Order review</h2>

                <p>
                  Review your information before
                  placing the order.
                </p>
              </div>
            </div>

            {currentStep === 3 && (
              <div className="checkout-review">

                <div className="review-block">
                  <div className="review-block-header">
                    <h3>Contact</h3>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                    >
                      Edit
                    </button>
                  </div>

                  <p>
                    {formData.firstName}{" "}
                    {formData.lastName}
                  </p>

                  <p>{formData.email}</p>

                  <p>{formData.phone}</p>
                </div>

                <div className="review-block">
                  <div className="review-block-header">
                    <h3>Shipping address</h3>

                    <button
                      type="button"
                      onClick={goBackToShipping}
                    >
                      Edit
                    </button>
                  </div>

                  <p>{formData.address}</p>

                  {formData.apartment && (
                    <p>{formData.apartment}</p>
                  )}

                  <p>
                    {formData.city},{" "}
                    {formData.state}
                  </p>

                  <p>{formData.postalCode}</p>

                  <p>{formData.country}</p>
                </div>

                <div className="checkout-place-order">
                  <p>
                    Your order is ready to be placed.
                  </p>

                 <button
                   type="button"
                   className="checkout-place-order-button"
                   onClick={handlePlaceOrder}
                  >
                   Place Order — $
                   {cartTotal.toFixed(2)}
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Order summary */}
        <aside className="checkout-summary">

          <div className="checkout-summary-header">
            <h2>Order Summary</h2>

            <span>
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </span>
          </div>

          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="checkout-summary-item"
              >
                <div className="checkout-summary-image">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>

                <div className="checkout-summary-info">
                  <h3>{item.title}</h3>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-summary-total">
            <span>Subtotal</span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <div className="checkout-summary-row">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="checkout-summary-grand-total">
            <span>Total</span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <Link
            to="/cart"
            className="checkout-back-link"
          >
            ← Back to cart
          </Link>

        </aside>

      </div>
    </section>
  );
}

export default Checkout;