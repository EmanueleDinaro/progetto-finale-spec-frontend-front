import { useEffect, useState } from "react";

export default function Home() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/beers")
      .then((res) => res.json())
      .then((data) => setBeers(data))
      .catch((err) => console.error("Errore nel fetch delle birre:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Birre Artigianali
      </h1>
      <div className="max-w-5xl mx-auto grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {beers.map((beer) => (
          <div
            key={beer.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {beer.title}
            </h2>
            <p className="text-sm text-gray-600">{beer.category}</p>
            <img
              className="h-48 mx-auto object-cover rounded-t-xl"
              src={beer.image}
              alt={beer.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
