const SearchBar = () => (
  <form action="/searchResults/" method="get" className="searchBar">
    <label htmlFor="header-search">
            <span className="visually-hidden">Search media</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="search media"
            name="s" 
        />
        <div > <button className="submitButton" type="submit">Search</button></div>
  </form>
)

export default SearchBar