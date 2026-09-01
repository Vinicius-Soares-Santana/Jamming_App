import React from 'react';
import { useEffect, useState } from 'react';
import SongCard from '../Presentational/SongCard';

function ListOfSelected(props){

  const [cardsToDisplay, setCardsToDisplay] = useState([])
  
  useEffect(()=>{
    try{
      setCardsToDisplay(props.onSelectedList?.map((songData) => <div className="SongCardDiv">
                          <SongCard songData={songData} id={songData.id}/><button id={songData.id} data-index={songData.PositionIndex} onClick={handleClick} >-</button>
                        </div>))
    }
      catch(error){
        return;
      }
  }, [props.onSelectedList]);


  function handleClick(event){
    const objId = event.target.id;
    const dataIndexId = event.currentTarget.dataset.index;
    const selectedSongData = props.onSelectedList.find(song => song.id === objId);
    props.setOnSelectedList((prev)=>prev.filter(song => (song.id !== objId) || (song.PositionIndex != dataIndexId)));
    props.setIndexGen((prev) => prev-1);
  }

  return <div className="ListOfSelected">
  {cardsToDisplay}
  </div>;
}

export default ListOfSelected;