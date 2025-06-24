import { createContext, useContext, useState } from "react";

// Creazione del context FavouriteContext
const FavouriteContext = createContext();

// Creazione ed esportazione del Provider che avvolge tutti i Components.jsx e gli fornisce State e Function
export default function FavouriteProvider({ children }) {
  const [favouriteBeers, setFavouriteBeers] = useState([]);

  // Funzione per aggiungere una birra ai preferiti
  function addToFavourite(beer) {
    if (favouriteBeers.find((b) => b.id === beer.id)) return;
    setFavouriteBeers([...favouriteBeers, beer]);
  }

  // Funzione per rimuovere una birra dai preferiti
  function removeFromFavourite(id) {
    setFavouriteBeers(favouriteBeers.filter((b) => b.id !== id));
  }

  // Con il return rendo stato e funzioni disponibili al Componenent che vuole usare il Contesto
  return (
    <FavouriteContext.Provider
      value={{ favouriteBeers, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

// Hook per usare facilmente il contesto
export function useFavourite() {
  return useContext(FavouriteContext);
}
