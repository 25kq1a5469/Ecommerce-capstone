import { Link } from "react-router-dom";
import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

function Cart({
  cart,
  updateQuantity,
  removeFromCart,
}: CartProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="empty">
        <h1>Your Cart Is Empty</h1>
        <p>Add some products to get started.</p>

        <Link to="/products" className="hero-button">
          Shop Products
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img
                src={item.product.image}
                alt={item.product.title}
              />

              <div>
                <h3>{item.product.title}</h3>
                <p>${item.product.price.toFixed(2)}</p>

                <div className="quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove"
                  onClick={() =>
                    removeFromCart(item.product.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>
              {cart.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="checkout">
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;