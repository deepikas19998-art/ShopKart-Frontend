import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryStrip from '../components/CategoryStrip';
import { useShop } from '../context/ShopContext';

const Products = () => {
  const { products, loading } = useShop();
  const location = useLocation();

  // URL params se initial values
  const params = new URLSearchParams(location.search);
  const [search,   setSearch]   = useState(params.get('search')   || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [sort,     setSort]     = useState('default');

  // Sync URL params
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setSearch(p.get('search') || '');
    setCategory(p.get('category') || '');
  }, [location.search]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search)   list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter((p) => p.category === category);

    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [products, search, category, sort]);

  return (
    <div className="products-page">
      <h1 style={{ fontSize: 26, marginBottom: 8 }}>All Products</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
        Discover our complete collection
      </p>

      <CategoryStrip active={category} onSelect={setCategory} />

      {/* Toolbar */}
      <div className="products-toolbar" style={{ marginTop: 8 }}>
        <input
          className="filter-input"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <span className="results-count">{filtered.length} products found</span>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;