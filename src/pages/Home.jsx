import { useEffect, useState, useCallback } from "react";
import beerImage from "../database/beerImage";
import BeerCard from "../components/BeerCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/FIlters";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
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

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

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
        <Filters
          sortOption={sortOption}
          setSortOption={setSortOption}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          debouncedSearch={debouncedSearch}
        />
      </div>

      {/* Inizio sezione Card */}
      {filteredBeers.length === 0 ? (
        <p className="text-center text-gray-600">Nessuna birra trovata.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </div>
  );
}
