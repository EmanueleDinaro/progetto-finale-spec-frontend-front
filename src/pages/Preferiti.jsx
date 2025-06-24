import { useEffect, useState } from "react";
import { useFavourite } from "../context/FavouriteContext";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

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
          {favouriteBeers.map((beer) => {
            const isBeerAdded = compareBeers.some((b) => b.id === beer.id);
            const isCompareFull = compareBeers.length >= 3 && !isBeerAdded;

            const isBeerAddedToFavourite = favouriteBeers.some(
              (b) => b.id === beer.id
            );

            return (
              <div
                key={beer.id}
                className="bg-white w-full rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between sm:flex-col gap-4 items-center">
                  <div className="flex flex-row sm:flex-col items-center">
                    <Link to={`/dettaglio/${beer.id}`}>
                      <div className="w-24 flex justify-center">
                        <img
                          className="h-24 sm:h-48 object-cover"
                          src={beer.image}
                          alt={beer.title}
                        />
                      </div>
                    </Link>
                    <div className="">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {beer.title}
                      </h2>
                      <p className="text-sm text-gray-600">{beer.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className={`cursor-pointer ${
                        isBeerAddedToFavourite
                          ? "fa-solid fa-heart text-3xl text-red-800 transition-colors duration-200"
                          : "fa-regular fa-heart text-3xl"
                      }`}
                      onClick={() => {
                        if (isBeerAddedToFavourite) {
                          removeFromFavourite(beer.id);
                        } else {
                          addToFavourite(beer);
                        }
                      }}
                    ></button>
                    <button
                      disabled={isCompareFull}
                      className={`py-2 px-3 rounded-xl transition-colors duration-300 cursor-pointer
                      ${
                        isBeerAdded ? "bg-green-700 text-white" : "bg-blue-300"
                      } disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed`}
                      onClick={() => {
                        if (isBeerAdded) {
                          removeFromCompare(beer.id);
                        } else {
                          addToCompare(beer);
                        }
                      }}
                    >
                      {isBeerAdded ? (
                        <>
                          <i className="fa-solid fa-check mr-1"></i> Aggiunta
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-plus mr-1"></i> Confronta
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
