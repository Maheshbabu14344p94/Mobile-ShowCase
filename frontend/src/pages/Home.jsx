import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import { LoadingScreen, ErrorScreen } from "../components/StateScreen.jsx";

export default function Home({ onOpenEmi }) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .listProducts()
      .then((data) => setProducts(data.products))
      .catch((e) => setError(e.message));
  }, []);

  const visibleProducts = useMemo(() => {
    if (!products || filter === "All") return products;
    return products.filter((product) => product.brand === filter);
  }, [products, filter]);

  return (
    <div className="nova-home mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <section className="nova-hero fade-up">
        <div className="max-w-2xl">
          <p className="eyebrow">Nova / 2026 collection</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-8xl">
            The phone<br /><em>you feel.</em>
          </h1>
          <p className="hero-copy mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Iconic hardware, honest monthly plans, and a better way to own the technology that moves with you.
          </p>
          <button
            type="button"
            data-cursor="hover"
            onClick={onOpenEmi}
            className="hero-link mt-8 inline-flex items-center gap-3 text-sm font-medium"
          >
            Explore how Nova works <span aria-hidden>↗</span>
          </button>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>01</span><span>Own beautifully</span></div>
        <div className="hero-device" aria-hidden="true">
          <div className="hero-device-glow" />
          <div className="hero-phone">
            <div className="hero-phone-screen">
              <div className="hero-phone-status"><span>9:41</span><span>● ● ▰</span></div>
              <div className="hero-phone-gallery-head"><span>Gallery</span><span>•••</span></div>
              <div className="hero-phone-hero-shot"><img src="/images/iphone-17-pro-orange.jpg" alt="" /></div>
              <div className="hero-phone-tabs"><span className="active">All photos</span><span>Albums</span></div>
              <div className="hero-phone-grid"><img src="/images/s26-ultra-black.png" alt="" /><img src="/images/oneplus-15-black.png" alt="" /><img src="/images/iphone-17-pro-blue.jpg" alt="" /><img src="/images/pixel-11-pro-xl.webp" alt="" /></div>
              <div className="hero-phone-nav"><span>⌂</span><span className="nav-active">▣</span><span>♡</span><span>◌</span></div>
            </div>
          </div>
        </div>
      </section>

      {error && <ErrorScreen message={error} />}
      {!products && !error && <LoadingScreen label="Fetching products" />}

      {products && (
        <section className="catalog-section">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">Curated devices</p><h2 className="font-display text-3xl font-semibold text-ink md:text-5xl">Find your next.</h2></div>
            <div className="filter-row" role="tablist" aria-label="Filter phones by brand">
              {["All", "Apple", "Samsung", "OnePlus"].map((option) => <button key={option} type="button" onClick={() => setFilter(option)} className={filter === option ? "is-selected" : ""}>{option}</button>)}
            </div>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => <article key={product.id} className={`catalog-product product-tone-${index + 1} fade-up`} style={{ animationDelay: `${index * 90}ms` }}>
              <Link to={`/products/${product.slug}`} data-cursor="hover" className="block h-full">
                <div className="product-topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{product.brand}</span></div>
                <div className="product-copy"><h3>{product.name}</h3><p>{product.description}</p></div>
                <div className="catalog-image"><img src={product.preview?.imageUrl} alt={`${product.name} ${product.preview?.color}`} loading="lazy" /></div>
                <div className="product-bottomline"><span>From ₹{(product.preview?.price ?? 0).toLocaleString("en-IN")}</span><span className="arrow-button" aria-hidden>↗</span></div>
              </Link>
            </article>)}
          </div>
        </section>
      )}
    </div>
  );
}
