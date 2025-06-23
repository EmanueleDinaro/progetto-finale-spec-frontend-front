import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";

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
    }
  }, [compareBeers]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Confronto Birre</h1>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {detailedBeers.map((beer) => (
          <div
            key={beer.id}
            className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/2"
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
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
            >
              Rimuovi dal confronto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
