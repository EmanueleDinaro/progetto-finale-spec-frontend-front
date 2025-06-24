import { createContext, useContext, useState } from "react";

// Creazione del context CompareContext
const CompareContext = createContext();

// Creazione ed esportazione del Provider che avvolge tutti i Components.jsx e gli fornisce State e Function
export default function CompareProvider({ children }) {
  const [compareBeers, setCompareBeers] = useState([]);

  // Funzione per aggiungere una birra al confronto (massimo 3)
  function addToCompare(beer) {
    if (compareBeers.find((b) => b.id === beer.id)) return;
    if (compareBeers.length >= 3) return;
    setCompareBeers([...compareBeers, beer]);
  }

  // Funzione per rimuovere una birra dal confronto
  function removeFromCompare(id) {
    setCompareBeers(compareBeers.filter((b) => b.id !== id));
  }

  // Con il return rendo stato e funzioni disponibili al Componenent che vuole usare il Contesto
  return (
    <CompareContext.Provider
      value={{ compareBeers, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// Hook per usare facilmente il contesto
export function useCompare() {
  return useContext(CompareContext);
}
