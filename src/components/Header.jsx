import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white px-6 py-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold">BeerCompare 🍺</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link
            to="/confronta"
            className="hover:text-yellow-400 transition-colors"
          >
            Confronta
          </Link>
          <Link
            to="/preferiti"
            className="hover:text-yellow-400 transition-colors"
          >
            Preferiti
          </Link>
        </div>
      </nav>
    </header>
  );
}
