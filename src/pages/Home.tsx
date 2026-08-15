import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">NEURAFORGE STORE</p>

          <h1>
            Discover Products
            <br />
            You'll Love
          </h1>

          <p>
            Shop quality electronics, fashion, accessories and
            everyday essentials in one place.
          </p>

          <Link to="/products" className="hero-button">
            Explore Products
          </Link>
        </div>
      </section>

      <section className="features">
        <div>
          <span>🚚</span>
          <h3>Fast Delivery</h3>
          <p>Quick and reliable delivery.</p>
        </div>

        <div>
          <span>🔒</span>
          <h3>Secure Shopping</h3>
          <p>A safe and simple shopping experience.</p>
        </div>

        <div>
          <span>⭐</span>
          <h3>Quality Products</h3>
          <p>Products selected with care.</p>
        </div>
      </section>
    </>
  );
}

export default Home;