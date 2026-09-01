import react from 'react';
import { useEffect, useState } from 'react';
import CreatePlaylistButton from '../Presentational/CreatePlaylistButton';

function CreatePlaylistContainer(props) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [publicValue, setPublicValue] = useState("false");
  const [playlistId, setplaylistId] = useState('');

  const playlistEndpoint = 'https://api.spotify.com/v1/me/playlists';

  function handleChangeName(event) {
      setPlaylistName(event.target.value);
  }

  function handleChangeDesc(event) {
    setPlaylistDescription(event.target.value);
  }

  function handleChangeRadio(event) {
    setPublicValue(event.target.value);
  }







  async function CreatePlaylistOnSpotify(tokenToUse, playlistNameChosen, playlistDesc, publicValue){
    const response = await fetch(playlistEndpoint, {
      method: "POST", 
        headers: {
          "Authorization": `Bearer ${tokenToUse}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: playlistNameChosen,
          description: playlistDesc,
          public: publicValue
        })
      }
    )

    const playlist = await response.json();

    return playlist;
  }








  async function handleSubmit(event){

    event.preventDefault();
    
    try{
      playlistReturned = await CreatePlaylistOnSpotify(props.token, playlistName, playlistDescription, publicValue);

      if(playlistReturned){
        setplaylistId(playlistReturned.id);
      }

    }catch(e){
      alert(`Error generating playlist: ${e}`);
      return
    }

    if(playlistId){
      try{
        listOfUris = props.onSelectedList.map((item) => `spotify:track:${item.id}`);

        responseAddItems = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`,
            {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${props.token}`,
                  "Content-Type": "application/json"
                },
              body: JSON.stringfy({
                  uris: listOfUris
                })
            });
      }catch(e){
        alert(`Error adding item to playlist: ${e}`)
      }
    }

    
  }



  return (
    <div id="CreatePlaylistContainer">
      <form onSubmit={handleSubmit}>
        <div className="PlaylistNameDiv">
            <label htmlFor="PlaylistnameInput">Give your new Playlist a name:</label>
            <input
              id="PlaylistnameInput"
              type="text"
              value={playlistName}
              onChange={handleChangeName}
            />
        </div>
        <div className="PlaylistDescDiv">
            <label htmlFor="PlaylistDescription">Describe your Playlist</label>
            <input
              id="PlaylistDescription"
              type="text"
              value={playlistDescription}
              onChange={handleChangeDesc}
            />
        </div>
        <div className="PlaylistRadioDiv">
            <label htmlFor="RadioPublic">Public Playlist</label>
            <input
              id="RadioPublic"
              type="radio"
              checked={publicValue === "true"}
              value={true}
              onChange={handleChangeRadio}
            />

            <label htmlFor="RadioPrivate">Private Playlist</label>
            <input
              id="RadioPrivate"
              type="radio"
              checked={publicValue === "false"}
              value={false}
              onChange={handleChangeRadio}
            />
        </div>

        <CreatePlaylistButton type="submit" />
      </form>
    </div>
  );
}

export default CreatePlaylistContainer;
