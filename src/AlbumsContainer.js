import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

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
  const albums = props.albums.map((l,i) => (
    <li key={i}>
     <Link to={`/album/${l.AlbumId}`}>{l.Title}</Link>
    </li>));

  return(
    <>
    <ul>
      {albums}
    </ul>
    </>
  );
}

export default AlbumsContainer;
