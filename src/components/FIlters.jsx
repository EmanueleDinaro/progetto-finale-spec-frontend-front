export default function Filters({
  sortOption,
  setSortOption,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <>
      <select
        className="w-30 border border-neutral-400 rounded-2xl pl-3 h-10 ml-auto bg-neutral-100"
        onChange={(e) => setSortOption(e.target.value)}
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
        onChange={(e) => setSelectedCategory(e.target.value)}
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
    </>
  );
}
