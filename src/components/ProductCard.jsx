import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">

      <div className="product-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h2 className="product-title">
          {product.title}
        </h2>

        <div className="product-rating">
          ★ {product.rating}
        </div>

        <div className="product-bottom">

          <span className="product-price">
            ${product.price}
          </span>

          <span className="product-discount">
            {Math.round(product.discountPercentage)}% OFF
          </span>

        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-button"
        >
          View Product
        </Link>

      </div>

    </article>
  );
}

export default ProductCard;