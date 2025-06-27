export default function SearchBar({
  inputValue,
  setInputValue,
  debouncedSearch,
}) {
  return (
    <input
      className="w-50 border border-neutral-400 rounded-2xl pl-3 h-10 bg-neutral-100"
      type="text"
      placeholder="Cerca una birra"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        debouncedSearch(e.target.value);
      }}
    />
  );
}
