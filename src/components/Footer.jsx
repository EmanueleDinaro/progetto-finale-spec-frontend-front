import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="mb-2">
          © 2025 BeerCompare - Il miglior sito per confrontare birre artigianali
        </p>
        <nav className="mb-4 space-x-4">
          <Link to="/aboutus" className="hover:text-yellow-400 transition">
            Chi siamo
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contatti
          </Link>
          <Link to="/policy" className="hover:text-yellow-400 transition">
            Privacy Policy
          </Link>
        </nav>
        <p>
          Seguici su:
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-yellow-400 transition mx-2"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-yellow-400 transition mx-2"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-yellow-400 transition mx-2"
          >
            Twitter
          </a>
        </p>
      </div>
    </footer>
  );
}
