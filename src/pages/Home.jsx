import { useEffect, useState } from "react";
import beerImage from "../database/beerImage";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  function handleSearch() {
    return beers.filter(
      (beer) =>
        beer.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
        beer.category.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  useEffect(() => {
    fetch("http://localhost:3001/beers")
      .then((res) => res.json())
      .then((backEndData) => {
        const beersWithImages = backEndData.map((backEndBeer, i) => ({
          ...backEndBeer,
          image: beerImage[i], // Aggiungo una nuova proprietà image all'array di stato beers, insieme alle proprietà title e category presenti nei dati fetchati dal BE
        }));
        setBeers(beersWithImages);
      })
      .catch((err) => console.error("Errore nel fetch delle birre:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Birre Artigianali
        </h1>
        <input
          className="w-50 border border-neutral-400 rounded-2xl pl-3 h-10"
          type="text"
          placeholder="Cerca una birra"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {handleSearch()
          .filter(
            (beer) =>
              beer.title.toLowerCase().includes(search.toLowerCase()) ||
              beer.category.toLowerCase().includes(search.toLowerCase())
          )
          // filtro, grazie allo stato search, prima di mappare, se lo stato search è vuoto non succede nulla ma se il search si riempie fa un ri-render del componente e mappa in base all'array beers filtrato.
          .map((beer) => (
            <div
              key={beer.id}
              className="bg-white w-full rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-row sm:flex-col items-center gap-4">
                <div className="w-24 flex justify-center">
                  <img
                    className="h-24 sm:h-48 object-cover"
                    src={beer.image}
                    alt={beer.title}
                  />
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {beer.title}
                  </h2>
                  <p className="text-sm text-gray-600">{beer.category}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
