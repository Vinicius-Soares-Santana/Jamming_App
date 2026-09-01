import React from 'react';
import { useState, useEffect } from 'react';

function SearchSectionContainer(props) {
  const [searchParams, setSearchParams] = useState('');
  const [searchText, setSearchText] = useState('');
  const [printDebug, setPrintDebug] = useState('');

  let trackSearchUrl = `https://api.spotify.com/v1/search?${searchParams}`;

  const test = false;


  //FOR TESTING-----------------------------------------------------------------------
  const trackSearchResultTest = {
    tracks: {
        href: "https://api.spotify.com/v1/search?q=taylor%20swift&type=track&limit=3",
        limit: 3,
        next: null,
        offset: 0,
        previous: null,
        total: 3,

        items: [
            {
                album: {
                    album_type: "album",
                    total_tracks: 16,
                    id: "album_1989",
                    name: "1989 (Taylor's Version)",
                    release_date: "2023-10-27",
                    images: [
                        {
                            url: "https://i.scdn.co/image/example1989large",
                            height: 640,
                            width: 640
                        },
                        {
                            url: "https://i.scdn.co/image/example1989medium",
                            height: 300,
                            width: 300
                        },
                        {
                            url: "https://i.scdn.co/image/example1989small",
                            height: 64,
                            width: 64
                        }
                    ]
                },

                artists: [
                    {
                        id: "artist_taylor",
                        name: "Taylor Swift",
                        type: "artist",
                        uri: "spotify:artist:artist_taylor"
                    }
                ],

                duration_ms: 231000,
                explicit: false,
                id: "track_blank_space",
                name: "Blank Space",
                popularity: 90,
                preview_url: null,
                track_number: 2,
                type: "track",
                uri: "spotify:track:track_blank_space"
            },

            {
                album: {
                    album_type: "album",
                    total_tracks: 16,
                    id: "album_1989",
                    name: "1989 (Taylor's Version)",
                    release_date: "2023-10-27",
                    images: [
                        {
                            url: "https://i.scdn.co/image/example1989large",
                            height: 640,
                            width: 640
                        }
                    ]
                },

                artists: [
                    {
                        id: "artist_taylor",
                        name: "Taylor Swift",
                        type: "artist",
                        uri: "spotify:artist:artist_taylor"
                    }
                ],

                duration_ms: 220000,
                explicit: false,
                id: "track_style",
                name: "Style",
                popularity: 88,
                preview_url: null,
                track_number: 3,
                type: "track",
                uri: "spotify:track:track_style"
            },

            {
                album: {
                    album_type: "album",
                    total_tracks: 16,
                    id: "album_1989",
                    name: "1989 (Taylor's Version)",
                    release_date: "2023-10-27",
                    images: [
                        {
                            url: "https://i.scdn.co/image/example1989large",
                            height: 640,
                            width: 640
                        }
                    ]
                },

                artists: [
                    {
                        id: "artist_taylor",
                        name: "Taylor Swift",
                        type: "artist",
                        uri: "spotify:artist:artist_taylor"
                    }
                ],

                duration_ms: 235000,
                explicit: false,
                id: "track_wildest_dreams",
                name: "Wildest Dreams",
                popularity: 87,
                preview_url: null,
                track_number: 9,
                type: "track",
                uri: "spotify:track:track_wildest_dreams"
            }
        ]
    }
};

//--------------------------------------------------------------------------------------------------










  function handleInputChange(event) {
    setSearchText(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSearchParams(
      new URLSearchParams({
        q: searchText.toLowerCase(),
        type: 'track',
        limit: 10,
      })
    );

    setPrintDebug(searchParams.toString());
    //test too------------------------------------------------------------------------
      if(test){
        props.setSearchResult(trackSearchResultTest)
      }else{
        try{
           const result = await fetch(trackSearchUrl, {
            headers: { Authorization: `Bearer: ${props.token}` },
          });

          if (result.ok) {
            try{
              data = await result.json();
              props.setSearchResult(data);
            } catch(e){
              alert(`Error while parsing result!: ${e.message}`);
            }
            
          }
        } catch(e){
          alert(`Error while gathering search result!: ${e.message}`);
        }
       
    }
  }


  return (
    <div className="SearchContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="SearchBar" id="labelSearchBar">
          Search for a song{' '}
        </label>
        <input
          type="text"
          id="SearchBar"
          value={searchText}
          onChange={handleInputChange}
        />
        <button type="submit" id="searchButton">
          Search
        </button>
      </form>
      <p>{printDebug}</p>
    </div>
  );
}

export default SearchSectionContainer;
