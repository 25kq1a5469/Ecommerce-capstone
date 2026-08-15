import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart, { type CartItem } from "./pages/Cart";
import NotFound from "./pages/NotFound";

import type { Product } from "./types/product";

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("neura-cart");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "neura-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCart((current) =>
        current.filter((item) => item.product.id !== id)
      );

      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.product.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) =>
      current.filter((item) => item.product.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <Products onAddToCart={addToCart} />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;