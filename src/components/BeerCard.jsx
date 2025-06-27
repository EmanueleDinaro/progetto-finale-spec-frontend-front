import { Link } from "react-router-dom";
import { useFavourite } from "../context/FavouriteContext";
import { useCompare } from "../context/CompareContext";

export default function BeerCard({ beer }) {
  const { addToCompare, removeFromCompare, compareBeers } = useCompare();
  const { addToFavourite, removeFromFavourite, favouriteBeers } =
    useFavourite();

  const isBeerAdded = compareBeers.some((b) => b.id === beer.id);
  const isCompareFull = compareBeers.length >= 3 && !isBeerAdded;

  const isBeerAddedToFavourite = favouriteBeers.some((b) => b.id === beer.id);

  return (
    <div className="bg-white w-full rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow">
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
}
