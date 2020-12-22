import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
  const playlists = props.playlists.map((l,i) => <li key={i}>{l.Name}</li>);

  return(
    <>
    <ul>
      {playlists}
    </ul>
    </>
  );
}

export default PlaylistsContainer;





