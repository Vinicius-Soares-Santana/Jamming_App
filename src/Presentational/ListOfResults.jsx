import react from 'react';
import { useState, useEffect } from 'react';
import SongCard from './SongCard';

function ListOfResults(props) {
  const [listReturned, setListReturned] = useState([]);

  

  useEffect(() => {
    try{
      setListReturned(props.searchResult.tracks.items);
    }
      catch(error){
        return;
      }
    }, [props.searchResult]);

    function handleClick(event){
      const objId = event.target.id;
      const selectedSongData = listReturned.find(song => song.id === objId);
      props.setIndexGen((prev) => prev+1)
      const newSongData = { ...selectedSongData, PositionIndex: props.indexGen};
      props.setOnSelectedList(prev => [newSongData, ...prev]);
    }


  return (<div id="results_found">
    {listReturned?.map((songData) => <div className="SongCardDiv">
                                        <SongCard songData={songData} id={songData.id}/><button id={songData.id} onClick={handleClick}>+</button>
                                      </div>)}
  </div>);
}

export default ListOfResults;
