import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Dettaglio() {
  const { id } = useParams();
  const [fetchedBeer, setFetchedBeer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/beers/${id}`)
      .then((res) => res.json())
      .then((data) => setFetchedBeer(data.beer))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row gap-6">
      <img
        className="w-1/2 mx-auto sm:w-1/3 object-contain"
        src={fetchedBeer?.image}
        alt={fetchedBeer?.title}
      />
      <div className="md:w-1/2 flex flex-col justify-center space-y-2">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {fetchedBeer?.title}
        </h2>
        <div className="flex items-center space-x-4 text-gray-700 text-lg font-medium">
          <p>Birrificio: {fetchedBeer?.brewery}</p>
          <span>|</span>
          <p>{fetchedBeer?.country}</p>
        </div>
        <p className="text-gray-600 italic">Stile: {fetchedBeer?.category}</p>

        <p className=" font-semibold text-gray-800">
          ABV: <span>{fetchedBeer?.abv}%</span>
        </p>
        <p className="text-lg text-gray-700">Colore: {fetchedBeer?.color}</p>
        <p className="text-gray-700">{fetchedBeer?.description}</p>
      </div>
    </div>
  );
}
