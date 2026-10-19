function ProductSkeleton() {
  return (
    <article className="product-card product-skeleton">

      <div className="skeleton-image"></div>

      <div className="skeleton-info">

        <div className="skeleton-line skeleton-category"></div>

        <div className="skeleton-line skeleton-title"></div>

        <div className="skeleton-line skeleton-title-short"></div>

        <div className="skeleton-line skeleton-rating"></div>

        <div className="skeleton-bottom">
          <div className="skeleton-line skeleton-price"></div>
          <div className="skeleton-line skeleton-discount"></div>
        </div>

        <div className="skeleton-button"></div>

      </div>

    </article>
  );
}

export default ProductSkeleton;