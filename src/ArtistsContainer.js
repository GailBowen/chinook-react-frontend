import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { GET_ARTISTS } from './graphql/queries';

const ArtistsContainer = () => (
  <Query query={GET_ARTISTS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Artists artists={data.getArtists} />;
    }}
  </Query>
);

const Artists = (props) => {

  const artists = props.artists;
  const letterA = 65;
  const letters = [];

  for (let i=0;i<26;i++) {
    letters.push(String.fromCharCode(letterA+i));
  }

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
      <>
      <div key={x}>
        <h2>{x}</h2>
        {artistsForLetter}
      </div>
      </>
    );
  });

  return(
    <>
    <h1>Artists</h1>
    {indexedArtists}
    </>
  );
}

export default ArtistsContainer;
