import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_ALBUMS = gql`
{
  getAlbums{
    AlbumId
    Title
    ArtistId
  }
}
`;

const AlbumsContainer = () => (
  <Query query={GET_ALBUMS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Albums albums={data.getAlbums} />;
    }}
  </Query>
);

const Albums = (props) => {
  console.debug(props);
  const albums = props.albums.map((l,i) => <li key={i}>{l.Title}</li>);

  return(
    <>
    <ul>
      {albums}
    </ul>
    </>
  );
}

export default AlbumsContainer;
