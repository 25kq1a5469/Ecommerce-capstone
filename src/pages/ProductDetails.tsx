import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import type { Product } from "../types/product";

interface ProductDetailsProps {
  onAddToCart: (product: Product) => void;
}

function ProductDetails({
  onAddToCart,
}: ProductDetailsProps) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="empty">
        <h1>Product not found</h1>
        <Link to="/products" className="hero-button">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="details">
      <img src={product.image} alt={product.title} />

      <div>
        <span className="category">{product.category}</span>

        <h1>{product.title}</h1>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <h2>${product.price.toFixed(2)}</h2>

        <p className="description">
          {product.description}
        </p>

        <button
          className="hero-button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;