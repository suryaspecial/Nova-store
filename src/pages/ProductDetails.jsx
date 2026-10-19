import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/productApi";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProduct() {
    setLoading(true);
    setError("");

    try {
      const data = await getProductById(id);

      setProduct(data);
      setSelectedImage(data.images?.[0] || data.thumbnail);
      setQuantity(1);
    } catch (error) {
      setError(
        "We couldn't load this product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [id]);

  function increaseQuantity() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddToCart() {
    addToCart(product, quantity);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  }

  /* ---------- Loading ---------- */

  if (loading) {
    return (
      <section className="product-details-loading">

        <div className="product-loading-image"></div>

        <div className="product-loading-info">

          <div className="product-loading-category"></div>

          <div className="product-loading-title"></div>

          <div className="product-loading-rating"></div>

          <div className="product-loading-price"></div>

          <div className="product-loading-description"></div>

          <div className="product-loading-description short"></div>

          <div className="product-loading-button"></div>

        </div>

      </section>
    );
  }

  /* ---------- Error ---------- */

  if (error) {
    return (
      <section className="product-details-error">

        <div className="product-error-icon">
          !
        </div>

        <p className="eyebrow">
          PRODUCT UNAVAILABLE
        </p>

        <h1>
          We couldn't load this product
        </h1>

        <p>
          {error}
        </p>

        <button
          type="button"
          className="retry-button"
          onClick={loadProduct}
        >
          Try Again
        </button>

      </section>
    );
  }

  return (
    <section className="product-details">

      <Link
        to="/products"
        className="back-link"
      >
        ← Back to products
      </Link>

      <div className="product-details-layout">

        {/* ---------- Product Gallery ---------- */}

        <div className="product-gallery">

          <div className="product-details-image">

            <img
              src={selectedImage}
              alt={product.title}
              onError={(event) => {
                event.currentTarget.src =
                  product.thumbnail;
              }}
            />

          </div>

          <div className="product-thumbnails">

            {product.images?.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`thumbnail-button ${
                  selectedImage === image
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedImage(image)
                }
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                />
              </button>
            ))}

          </div>

        </div>


        {/* ---------- Product Information ---------- */}

        <div className="product-details-info">

          <p className="product-details-category">
            {product.category}
          </p>

          <h1>
            {product.title}
          </h1>

          <div className="product-details-rating">
            ★ {product.rating}
          </div>

          <p className="product-details-price">
            ${product.price}
          </p>

          <p className="product-details-description">
            {product.description}
          </p>


          {/* ---------- Stock ---------- */}

          <div className="product-details-stock">

            <div className="stock-status">

              <span className="stock-dot"></span>

              <strong>
                {product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </strong>

            </div>

            {product.stock > 0 && (
              <span className="stock-quantity">
                {product.stock} items available
              </span>
            )}

          </div>


          {/* ---------- Quantity ---------- */}

          <div className="quantity-section">

            <span className="quantity-label">
              Quantity
            </span>

            <div className="quantity-selector">

              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label={`Decrease quantity of ${product.title}`}
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label={`Increase quantity of ${product.title}`}
                disabled={
                  quantity === product.stock ||
                  product.stock === 0
                }
              >
                +
              </button>

            </div>

          </div>


          {/* ---------- Add to Cart ---------- */}

          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Add ${product.title} to cart`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : addedToCart
                ? "✓ Added to Cart"
                : "Add to Cart"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;