import React from 'react';
import { useQuery } from 'react-apollo';
import { Link, useHistory } from 'react-router-dom';

import { GET_ALBUMS } from './graphql/query/album';

import AddButton from './components/AddButton';

const AlbumsContainer = () => {
  const { loading, error, data } = useQuery(GET_ALBUMS, {
    fetchPolicy: "cache-and-network"
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return 'Loading';
  }

  return <Albums albums={data.getAlbums} artists={data.getArtists} />;
};

const Albums = (props) => {
  const artists = props.artists;
  const albums = props.albums;

  const history = useHistory();

  const output = artists.map((x) => {

    const artistAlbums = albums.filter((a) => {
      return a.ArtistId===x.ArtistId;
    }).map((a) => {
      return (
        <div key={a.AlbumId}>
          <div className="album"><Link to={`/album/${a.AlbumId}`}>{a.Title}</Link></div>
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

  const handleAdd = () => {
    history.push('/addalbum');
  };

  return(
    <div key="albums">
      <h1>Albums</h1>
      <AddButton handleClick={handleAdd} caption="Add Album" />
      {output}
    </div>
  );
}

export default AlbumsContainer;
