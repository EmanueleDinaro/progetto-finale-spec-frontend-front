import { useEffect, useState } from "react";
import beerImage from "../database/beerImage";
import { Link } from "react-router-dom";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  function getTitle() {
    if (search) {
      return `Risultati per: "${search}"`;
    } else if (selectedCategory && selectedCategory !== "Tutte le birre") {
      return `Categoria: ${selectedCategory}`;
    } else {
      return "Tutti i risultati:";
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
    if (!selectedCategory) {
      return true;
    } else {
      return beer.category
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    }
  };

  // Funzione per filtrare tutte le birre
  // La funzione getFilteredBeers ritorna tutte le birre inizialmente perché una stringa vuota ("") è contenuta in tutte le stringhe, quindi search vuoto passa sempre il filtro matchSearchBar.
  // Lo state selectedCategory vuoto fa passare tutte le birre nel filter matchCategory perchè ritorna TRUE.
  // Quindi, all’avvio senza filtri, vengono mostrate tutte le birre perchè entrambe TRUE nella funzione getFilteredBeers.
  function getFilteredBeers() {
    return beers.filter((beer) => matchSearchBar(beer) && matchCategory(beer));
  }

  // Array di oggetti che contiene le birre eventualmente filtrate
  const filteredBeers = getFilteredBeers();

  // Assegnazione e creazione di un nuovo array basato sulle birre filtrate che vengono ordinate tramite .sort SE scatenato l'evento onClick del select ed aggiornato lo stato "sortOption"
  const filteredAndSortedBeers = filteredBeers.sort((a, b) => {
    if (sortOption === "nameAsc") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "nameDec") {
      return b.title.localeCompare(a.title);
    }
    if (sortOption === "catAsc") {
      return a.category.localeCompare(b.category);
    }
    if (sortOption === "catDec") {
      return b.category.localeCompare(a.category);
    }
    return 0; // ritorna 0, quindi non succede nulla, nel caso il "sortOption" sia vuoto e non scatenato
  });

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
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{getTitle()}</h1>

      {/* Inizio sezione di ricerca e filtraggio */}
      <div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-5 mb-6 justify-between">
        <select
          className="w-30 border border-neutral-400 rounded-2xl pl-3 h-10 ml-auto bg-neutral-100"
          onChange={(e) => {
            setSortOption(e.target.value);
          }}
          value={sortOption}
        >
          <option value="">Ordina per:</option>
          <option value="nameAsc">Nome: A-Z</option>
          <option value="nameDec">Nome: Z-A</option>
          <option value="catAsc">Stile: A-Z</option>
          <option value="catDec">Stile: Z-A</option>
        </select>
        <select
          className="w-50 border border-neutral-400 rounded-2xl pl-3 h-10 bg-neutral-100"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
        >
          <option value="">Tutte le categorie</option>
          <option value="Berliner Weisse">Berliner Weisse</option>
          <option value="Gose">Gose</option>
          <option value="IPA">IPA - Imperial/Double IPA</option>
          <option value="Stout">Stout - Imperial Stout</option>
          <option value="Belgian Strong Ale">Belgian Strong Ale</option>
          <option value="Lambic">Lambic</option>
        </select>
        <input
          className="w-50 border border-neutral-400 rounded-2xl pl-3 h-10 bg-neutral-100"
          type="text"
          placeholder="Cerca una birra"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Inizio sezione Card */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedBeers.map((beer) => (
          <Link to={`/dettaglio/${beer.id}`}>
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
              <button onClick={() => addToCompare(beer)} className="">
                Confronta
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
