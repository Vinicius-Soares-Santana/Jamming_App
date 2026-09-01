import React from 'react';
import { useState, useEffect } from 'react';
import SearchContainer from './SearchContainer';
import ListOfResults from '../Presentational/ListOfResults';
import ListOfSelected from './ListOfSelected';
import CreatePlaylistContainer from './CreatePlaylistContainer';


function Jamming_main_screen(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [onSelectedList, setOnSelectedList] = useState([]);
  const [indexGen, setIndexGen] = useState(0);


  return (
    <div className="JammingMainScreen">
      <SearchContainer
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        token={props.token}
      />
      <ListOfResults searchResult={searchResult} setOnSelectedList={setOnSelectedList} indexGen={indexGen} setIndexGen={setIndexGen} />

      <ListOfSelected onSelectedList={onSelectedList} setOnSelectedList={setOnSelectedList} indexGen={indexGen} setIndexGen={setIndexGen} />

      <CreatePlaylistContainer onSelectedList={onSelectedList} setOnSelectedList={setOnSelectedList} token={props.token} />
    </div>
  );
}

export default Jamming_main_screen;
