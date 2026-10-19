import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import useDebounce from "../hooks/useDebounce";

function Products() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);

  const [selectedRating, setSelectedRating] = useState(0);

  const [sortOption, setSortOption] = useState("featured");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Load products
  useEffect(() => {
  loadProducts();
  }, []);

  async function loadProducts() {
  setLoading(true);
  setError("");

  try {
    const data = await getProducts();

    setProducts(data);

    const prices = data.map((product) => product.price);

    const lowestPrice = Math.floor(Math.min(...prices));
    const highestPrice = Math.ceil(Math.max(...prices));

    setMinPrice(lowestPrice);
    setMaxPrice(highestPrice);

    setSelectedMinPrice(lowestPrice);
    setSelectedMaxPrice(highestPrice);
  } catch (error) {
    setError(
      "We couldn't load the products. Please try again."
    );
  } finally {
    setLoading(false);
  }
  }

  // Create category list
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return uniqueCategories.sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
  const search = debouncedSearch.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesPrice =
      product.price >= selectedMinPrice &&
      product.price <= selectedMaxPrice;

    const matchesRating =
      product.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating
    );
  });

  // Create a new array so the original API data
  // is not modified.
  const sorted = [...filtered];

  switch (sortOption) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;

    case "name-az":
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "name-za":
      sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;

    case "featured":
    default:
      // Keep the original API order.
      break;
  }

  return sorted;
}, [
  products,
  debouncedSearch,
  selectedCategory,
  selectedMinPrice,
  selectedMaxPrice,
  selectedRating,
  sortOption,
]);

  // Clear all filters
  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
    setSelectedRating(0);
     setSortOption("featured");
  }

  // Minimum price slider
  function handleMinPriceChange(event) {
    const value = Number(event.target.value);

    if (value <= selectedMaxPrice) {
      setSelectedMinPrice(value);
    }
  }

  // Maximum price slider
  function handleMaxPriceChange(event) {
    const value = Number(event.target.value);

    if (value >= selectedMinPrice) {
      setSelectedMaxPrice(value);
    }
  }

  // Loading state
  if (loading) {
  return (
    <section className="products-page">

      <div className="products-header">
        <div>
          <p className="eyebrow">
            NOVA COLLECTION
          </p>

          <h1>
            Discover our products
          </h1>

          <p>
            Explore our collection of carefully
            selected products.
          </p>
        </div>
      </div>

      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>

    </section>
  );
}

  // Error state
 if (error) {
  return (
    <section className="products-error">

      <div className="products-error-icon">
        !
      </div>

      <p className="eyebrow">
        SOMETHING WENT WRONG
      </p>

      <h1>
        We couldn't load the products
      </h1>

      <p>
        {error}
      </p>

      <button
        type="button"
        className="retry-button"
        onClick={loadProducts}
      >
        Try Again
      </button>

    </section>
  );
}

  return (
    <section className="products-page">

      {/* Header */}
      <div className="products-header">
        <div>
          <p className="eyebrow">
            NOVA COLLECTION
          </p>

          <h1>
            Discover our products
          </h1>

          <p>
            Explore our collection of carefully
            selected products.
          </p>
        </div>

        <span className="product-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </span>
      </div>

      {/* Search */}
      <div className="product-search">
        <label htmlFor="product-search">
          Search products
        </label>

        <div className="search-input-wrapper">
          <span className="search-icon">
            ⌕
          </span>

          <input
            id="product-search"
            type="search"
            placeholder="Search by product, category..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="product-filters">

        {/* Category */}
        <div className="filter-group">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            <option value="all">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="price-filter">
          <div className="price-filter-header">
            <label>
              Price Range
            </label>

            <span>
              ${selectedMinPrice} – ${selectedMaxPrice}
            </span>
          </div>

          <div className="price-sliders">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedMinPrice}
              onChange={handleMinPriceChange}
              aria-label="Minimum price"
            />

            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedMaxPrice}
              onChange={handleMaxPriceChange}
              aria-label="Maximum price"
            />
          </div>

          <div className="price-filter-limits">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="rating-filter">
          <label htmlFor="rating-filter">
            Minimum Rating
          </label>

          <select
            id="rating-filter"
            value={selectedRating}
            onChange={(event) =>
              setSelectedRating(Number(event.target.value))
            }
          >
            <option value="0">
              All Ratings
            </option>

            <option value="4.5">
              ★ 4.5+
            </option>

            <option value="4">
              ★ 4.0+
            </option>

            <option value="3.5">
              ★ 3.5+
            </option>

            <option value="3">
              ★ 3.0+
            </option>
          </select>
        </div>
        {/* Sorting */}
        <div className="sort-filter">
        <label htmlFor="sort-filter">
          Sort By
        </label>

         <select
          id="sort-filter"
          value={sortOption}
          onChange={(event) =>
          setSortOption(event.target.value)
           }
          >
         <option value="featured">
           Featured
          </option>

         <option value="price-low">
           Price: Low to High
         </option>

         <option value="price-high">
          Price: High to Low
         </option>

         <option value="rating">
          Rating: High to Low
         </option>

        <option value="name-az">
          Name: A → Z
        </option>

        <option value="name-za">
         Name: Z → A
        </option>
        </select>
        </div>
        {/* Clear filters */}
        {(searchTerm ||
          selectedCategory !== "all" ||
          selectedMinPrice !== minPrice ||
          selectedMaxPrice !== maxPrice ||
          selectedRating !== 0 ||
          sortOption !== "featured") && (
          <button
            type="button"
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h2>No products found</h2>

          <p>
            Try changing your search, category,
            price range, or rating.
          </p>

          <button
            type="button"
            className="no-products-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;