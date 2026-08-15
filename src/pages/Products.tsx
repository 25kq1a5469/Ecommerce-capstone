import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

function Products({ onAddToCart }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  return (
    <main className="products-page">
      <div className="page-heading">
        <p className="hero-label">OUR COLLECTION</p>
        <h1>Products</h1>
        <p>Find something you'll love.</p>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;