const Search = ({ onSearch, searchTerm }) => {
  const handleSearchTerm = (event) => {
    onSearch(event.target.value);
  };
  return (
    <label>
      <strong>Search Products</strong>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTerm}
        placeholder="Handmade Football..."
      />
    </label>
  );
};

export default Search;
