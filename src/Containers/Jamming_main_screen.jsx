import React from 'react';
import { useState, useEffect } from 'react';
import SearchContainer from './SearchContainer';

function Jamming_main_screen(props){
  const [searchResult, setSearchResult] = useState(null);

  return <>
            <SearchContainer setSearchResult={setSearchResult} />
        </>
}

export default Jamming_main_screen;