import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>

        <Link to={`/products/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>

        <p className="rating">⭐ {product.rating}</p>

        <div className="product-bottom">
          <strong>${product.price.toFixed(2)}</strong>

          <button onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;