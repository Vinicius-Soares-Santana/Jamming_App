import React from 'react';
import { useState, useEffect } from 'react';

function SearchSectionContainer(props) {
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useState(null);
  const [searchText, setSeachText] = useState("");


  const trackSearchUrl = "";

  function handleInputChange(event){
    setSeachText(event.target.value);
  }

  async function retrieveData(search) {}
  return <>
    <form>
      <label htmlFor="SearchBar" id="labelSearchBar">Search for a song type: </label>
      <input type="text" id="SearchBar" value={searchText} onChange={handleInputChange} />
    </form>
  </>;
}

export default SearchSectionContainer;
