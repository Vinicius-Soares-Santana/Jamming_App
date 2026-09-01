import react from 'react';
import { useState, useEffect } from 'react';

function SongCard(props) {

  function timeString(ms) {
    if(typeof(ms) !== "number"){return};
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <br />

      <div className="SongCard">
        <h2 className="SongTitle">{props.songData.name}</h2>
        <h4 className="albumName">{props.songData.album.name}</h4>
        <p className="songLength">{timeString(props.songData.duration_ms)}</p>
      </div>

      <br />
    </>
  );
}

export default SongCard;
