import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";

import {FaShieldAlt,FaTruck,FaHeart,FaHeadset,} from "react-icons/fa";


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await getProducts();

        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <div className="home-page">

      {/* ---------- Hero Section ---------- */}

      <section className="home-hero">

        <div className="home-hero-content">

          <p className="home-eyebrow">
            WELCOME TO NOVA
          </p>

          <h1>
            Everyday products.
            <br />
            Better shopping.
          </h1>

          <p className="home-hero-text">
            Discover carefully selected products designed
            to make everyday life a little better.
          </p>

          <div className="home-hero-actions">

            <Link
              to="/products"
              className="home-primary-button"
            >
              Shop Products
            </Link>

            <Link
              to="/products"
              className="home-secondary-button"
            >
              Explore Collection
            </Link>

          </div>

        </div>

      </section>


      {/* ---------- Featured Products ---------- */}

      <section className="home-featured">

        <div className="home-section-header">

          <div>
            <p className="home-eyebrow">
              FEATURED COLLECTION
            </p>

            <h2>
              Popular picks
            </h2>

            <p>
              Explore some of our carefully selected products.
            </p>
          </div>

          <Link
            to="/products"
            className="home-view-all"
          >
            View All Products →
          </Link>

        </div>


        {loading ? (

          <div className="home-featured-grid">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="home-product-placeholder"
              >
                <div className="home-placeholder-image"></div>

                <div className="home-placeholder-line"></div>

                <div className="home-placeholder-line short"></div>
              </div>
            ))}

          </div>

        ) : (

          <div className="home-featured-grid">

            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </section>
    {/* ---------- Shop by Category ---------- */}

<section className="home-categories">

  <div className="home-category-header">

    <p className="home-eyebrow">
      SHOP BY CATEGORY
    </p>

    <h2>
      Find what you need
    </h2>

    <p>
      Browse our collection by category and discover
      products made for everyday life.
    </p>

  </div>


  <div className="home-category-grid">

    <Link
      to="/products?category=beauty"
      className="home-category-card"
    >
      <span className="category-number">01</span>

      <div>
        <h3>Beauty</h3>
        <p className="para">Explore beauty essentials</p>
      </div>

      <span className="category-arrow">↗</span>
    </Link>


    <Link
      to="/products?category=fragrances"
      className="home-category-card"
    >
      <span className="category-number">02</span>

      <div>
        <h3>Fragrances</h3>
        <p className="para">Discover signature scents</p>
      </div>

      <span className="category-arrow">↗</span>
    </Link>


    <Link
      to="/products?category=furniture"
      className="home-category-card"
    >
      <span className="category-number">03</span>

      <div>
        <h3>Furniture</h3>
        <p className="para">Upgrade your living space</p>
      </div>

      <span className="category-arrow">↗</span>
    </Link>


    <Link
      to="/products?category=groceries"
      className="home-category-card"
    >
      <span className="category-number">04</span>

      <div>
        <h3>Groceries</h3>
        <p className="para">Everyday essentials</p>
      </div>

      <span className="category-arrow">↗</span>
    </Link>

  </div>


  <div className="home-category-button-wrapper">

    <Link
      to="/products"
      className="home-category-button"
    >
      View All Categories →
    </Link>

  </div>

  </section>
  {/* ---------- Why NOVA ---------- */}

<section className="home-why">

  <div className="home-why-header">

    <p className="home-eyebrow">
      WHY NOVA
    </p>

    <h2>
      Shopping should feel simple.
    </h2>

    <p>
      We've designed NOVA around the things that
      make online shopping easier and more enjoyable.
    </p>

  </div>


  <div className="home-benefits">

    <div className="home-benefit">

      
    <div className="benefit-number">
       <FaShieldAlt aria-hidden="true" />
    </div>


      <h3>
        Curated Products
      </h3>

      <p>
        A carefully selected collection of products
        for everyday needs and moments.
      </p>

    </div>


    <div className="home-benefit">

      
    <div className="benefit-number">
       <FaTruck aria-hidden="true" />
    </div>


      <h3>
        Simple Shopping
      </h3>

      <p>
        Find what you need quickly with intuitive
        search, filters and categories.
      </p>

    </div>


    <div className="home-benefit">

      <div className="benefit-number">
       <FaHeart aria-hidden="true" />
      </div>

      <h3>
        Quality Experience
      </h3>

      <p>
        A clean, responsive shopping experience
        designed for every screen.
      </p>

    </div>


    <div className="home-benefit">

      <div className="benefit-number">
       <FaHeadset aria-hidden="true" />
      </div>

      <h3>
        Easy Checkout
      </h3>

      <p>
        A straightforward checkout process from
        your cart to your order confirmation.
      </p>

    </div>

  </div>

</section>
{/* ---------- Final CTA ---------- */}

<section className="home-final-cta">

  <div className="home-final-cta-content">

    <p className="home-eyebrow">
      READY TO EXPLORE?
    </p>

    <h2>
      Find something
      <br />
      you'll love.
    </h2>

    <p>
      Browse our collection and discover products
      made for everyday life.
    </p>

    <Link
      to="/products"
      className="home-final-cta-button"
    >
      Start Shopping →
    </Link>

  </div>

</section>
    </div>
  );
}

export default Home;