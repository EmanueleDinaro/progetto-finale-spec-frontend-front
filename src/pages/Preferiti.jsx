import { useEffect, useState } from "react";
import { useFavourite } from "../context/FavouriteContext";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import BeerCard from "../components/BeerCard";

export default function Preferiti() {
  const [detailedBeers, setDetailedBeers] = useState([]);
  const { favouriteBeers, removeFromFavourite } = useFavourite();
  const { compareBeers, addToCompare, removeFromCompare } = useCompare();

  useEffect(() => {
    async function fetchDetails() {
      const promises = favouriteBeers.map((beer) =>
        fetch(`http://localhost:3001/beers/${beer.id}`)
          .then((res) => res.json())
          .then((data) => data.beer)
      );
      const results = await Promise.all(promises);
      setDetailedBeers(results);
    }
    if (favouriteBeers.length > 0) {
      fetchDetails();
    } else {
      setDetailedBeers([]);
    }
  }, [favouriteBeers]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Birre Preferite</h1>
      {detailedBeers.length === 0 ? (
        <p className="text-center text-gray-600">
          Nessuna birra selezionata. Torna alla{" "}
          <Link to="/" className="text-blue-500 underline">
            Home
          </Link>
          .
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </div>
  );
}
