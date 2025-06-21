import { useEffect, useState } from "react";
import beerImage from "../database/beerImage";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function getTitle() {
    if (search) {
      return `Risultati per "${search}"`;
    } else if (selectedCategory && selectedCategory !== "Tutte le birre") {
      return `Categoria: ${selectedCategory}`;
    } else {
      return "Tutti i risultati";
    }
  }

  // Funzione per matchare il testo nella searchbar
  function matchSearchBar(beer) {
    return (
      beer.title.toLowerCase().includes(search.toLowerCase()) ||
      beer.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Funzione per matchare la categoria selezionata dalla select
  const matchCategory = (beer) => {
    if (!selectedCategory || selectedCategory === "Tutte le birre") {
      return true;
    } else {
      return beer.category
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    }
  };

  // Funzione per filtrare tutte le birre
  function getFilteredBeers() {
    return beers.filter((beer) => matchSearchBar(beer) && matchCategory(beer));
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
          {getTitle()}
        </h1>
        <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2 mb-2 sm:mb-0">
          <select
            className="w-50 border border-neutral-400 rounded-2xl pl-3 h-10"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            value={selectedCategory}
          >
            <option value="Tutte le birre">Tutte le categorie</option>
            <option value="Berliner Weisse">Berliner Weisse</option>
            <option value="Gose">Gose</option>
            <option value="IPA">IPA - Imperial/Double IPA</option>
            <option value="Stout">Stout - Imperial Stout</option>
            <option value="Belgian Strong Ale">Belgian Strong Ale</option>
            <option value="Lambic">Lambic</option>
          </select>
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
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          // La funzione getFilteredBeers ritorna tutte le birre inizialmente perché una stringa vuota ("") è contenuta in tutte le stringhe, quindi search vuoto passa sempre il filtro matchSearchBar.
          // La funzione selectedCategory vuota o "Tutte le birre" fa passare tutte le birre nel filtro matchCategory.
          // Quindi, all’avvio senza filtri, vengono mostrate tutte le birre perchè entrambe true nella funzione getFilteredBeers.
          getFilteredBeers().map((beer, index) => (
            <div
              key={index}
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
          ))
        }
      </div>
    </div>
  );
}
