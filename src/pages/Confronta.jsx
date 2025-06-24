import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

export default function Confronta() {
  const { compareBeers, removeFromCompare } = useCompare();
  const [detailedBeers, setDetailedBeers] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      const promises = compareBeers.map((beer) =>
        fetch(`http://localhost:3001/beers/${beer.id}`)
          .then((res) => res.json())
          .then((data) => data.beer)
      );
      const results = await Promise.all(promises);
      setDetailedBeers(results);
    }
    if (compareBeers.length > 0) {
      fetchDetails();
    } else {
      setDetailedBeers([]);
    }
  }, [compareBeers]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Confronto Birre</h1>
      {detailedBeers.length === 0 ? (
        <p className="text-center text-gray-600">
          Nessuna birra selezionata. Torna alla{" "}
          <Link to="/" className="text-blue-500 underline">
            Home
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {detailedBeers.map((beer) => (
            <div
              key={beer.id}
              className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 flex flex-col justify-between  min-h-[600px]"
            >
              <img
                className="w-full h-64 object-contain mb-4"
                src={beer.image}
                alt={beer.title}
              />
              <h2 className="text-2xl font-bold mb-2">{beer.title}</h2>
              <div className="text-gray-700 text-sm mb-1">
                <strong>Birrificio:</strong> {beer.brewery} | {beer.country}
              </div>
              <p className="italic text-gray-600">Stile: {beer.category}</p>
              <p className="mt-2">
                <strong>ABV:</strong> {beer.abv}%
              </p>
              <p>
                <strong>Colore:</strong> {beer.color}
              </p>
              <p>
                <strong>Prezzo:</strong> €{beer.price.toFixed(2)}
              </p>
              <p className="mt-2 text-gray-800">{beer.description}</p>
              <button
                onClick={() => removeFromCompare(beer.id)}
                className="cursor-pointer mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
              >
                Rimuovi dal confronto
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
