import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="empty">
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <Link to="/" className="hero-button">
        Back Home
      </Link>
    </main>
  );
}

export default NotFound;