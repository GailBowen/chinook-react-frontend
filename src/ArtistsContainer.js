import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory, Link } from 'react-router-dom';

import AddButton from './components/AddButton';

import generateLetters from './util/GenerateLetters';

import { GET_ARTISTS } from './graphql/query/artist';

const ArtistsContainer = () => { 
  return <Artists />;
};

const Artists = (props) => {

  const history = useHistory();

  const [artists, setArtists] = useState([]);

  let { loading, error, data } = useQuery(GET_ARTISTS, { 
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data && data.getArtists) {
      setArtists(data.getArtists);
    }
  }, [data]);

  if (loading) {
    return 'Loading';
  }

  if (error) {
    throw(error) 
  }

  const letters = generateLetters(artists.map((x) => x.Name));

  const indexedArtists = letters.map((x) => {

    const artistsForLetter = artists.filter((a) => {
      const artistName = a.Name;
      return artistName.startsWith(x.toLowerCase()) || artistName.startsWith(x.toUpperCase());
    }).map((a) => {
      return (
        <div className="artist" key={a.ArtistId}>
          <Link to={`/artist/${a.ArtistId}`}>{a.Name}</Link>
        </div>);
    });

    return (
      <div key={x}>
        <h2>{x}</h2>
        {artistsForLetter}
      </div>
    );
  });

  const handleAddArtistClick = (e) => {
    history.push('/addartist');
  };

  return(
    <div key="artists">
    <h1>Artists</h1>
    <AddButton handleClick={handleAddArtistClick} caption="Add Artist" />
    {indexedArtists}
    <AddButton handleClick={handleAddArtistClick} caption="Add Artist" />
    </div>
  );
}

export default ArtistsContainer;
