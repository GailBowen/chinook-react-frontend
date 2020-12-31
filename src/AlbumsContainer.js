import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import { ARTIST_FRAGMENT } from './graphql/query/artist';

const GET_ALBUMS = gql`
{
  getAlbums{
    AlbumId
    Title
    ArtistId
  }
  getArtists{
    ...ArtistFragment
  }
}
${ARTIST_FRAGMENT}
`;

const AlbumsContainer = () => (
  <Query query={GET_ALBUMS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Albums albums={data.getAlbums} artists={data.getArtists} />;
    }}
  </Query>
);

const Albums = (props) => {
  const artists = props.artists;
  const albums = props.albums;

  const output = artists.map((x) => {

    const artistAlbums = albums.filter((a) => {
      return a.ArtistId===x.ArtistId;
    }).map((a) => {
      return (
        <div key={a.AlbumId}>
          <div className="album" key={a.AlbumId}><Link to={`/album/${a.AlbumId}`}>{a.Title}</Link></div>
        </div>
      );
    });

    if (artistAlbums.length) {
      return (
        <div key={x.ArtistId}>
          <h2>{x.Name}</h2>
          {artistAlbums}
        </div>
      );
    }
    return null;

    });

  return(
    <div key="albums">
    <h1>Albums</h1>
    {output}
    </div>
  );
}

export default AlbumsContainer;
