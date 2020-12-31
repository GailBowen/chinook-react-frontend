import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import generateLetters from './util/GenerateLetters';

const GET_PLAYLISTS = gql`
{
  getPlaylists{
    PlaylistId
    Name
  }
}
`;

const PlaylistsContainer = () => (
  <Query query={GET_PLAYLISTS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Playlists playlists={data.getPlaylists} />;
    }}
  </Query>
);

const Playlists = (props) => {
  const playlists = props.playlists;
  const letters = generateLetters(playlists.map((p) => p.Name));

  const indexedPlaylists = letters.map((l) => {

    const pls = playlists.filter((p) => {
      return p.Name.startsWith(l);
    }).map((p) => {
      return (
        <div key={p.PlaylistId}>
          <span>{p.Name}</span>
        </div>
      );
    });

    return (
      <div key={l}>
        <h2 className={`letter-${l}`}>{l}</h2>
        {pls}
      </div>
    );
  });

  return(
    <div key="playlists">
      <h1>Playlists</h1>
      {indexedPlaylists}
    </div>
  );
}

export default PlaylistsContainer;
