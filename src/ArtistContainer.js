import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import KeyValue, { KeyValueEditable } from './components/KeyValue';
import EditButtons from './components/EditButtons';

import { GET_ARTIST } from './graphql/query/artist';
import { UPDATE_ARTIST } from './graphql/mutation/artist';

const ArtistContainer = () => { 
  let { artistId } = useParams();
  artistId = parseInt(artistId);

  const initData = {
    ArtistId: -1,
    Name : ''
  };

  const [artist, setArtist] = useState(initData);
  const [albums, setAlbums] = useState([]);

  const history = useHistory();

  const [updateArtist] = useMutation(UPDATE_ARTIST);

  let { loading, error, data } = useQuery(GET_ARTIST, {
    variables: { artistId },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data) {
      if (data.getArtist) {
        setArtist(data.getArtist);
      }
      if (data.getAlbumsByArtist) {
        setAlbums(data.getAlbumsByArtist);
      }
    }
  }, [data]);

  if (error) {
    if (artistId) {
      throw(error);
    }
  }

  if (loading) {
    return "Loading";
  }


  const albumElements = albums.map((l,i) => {
    return ( 
        <div key={l.AlbumId}>
          <Link to={`/album/${l.AlbumId}`}>{l.Title}</Link>
        </div> );
  });

  const handleNameChange = (e) => {
    setArtist(p => ({
      ArtistId: p.ArtistId,
      Name: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateArtist({
      variables: {
        artistId: artist.ArtistId,
        artistName: artist.Name
      }
    }).then(() => {
      history.push('/artists');
    });
  };

  const handleDelete = (e) => {
  }

  const canDelete = () => false;

  return (
  <div key={artist.ArtistId}>
    <h1>Artist</h1>

    <form>
      <div className="key-values">
      {artist.ArtistId > -1 && <KeyValue label="Artist Id" value={artist.ArtistId} /> }
        <KeyValueEditable label="Name" defaultValue={artist.Name} handleChange={handleNameChange} />
      </div>
      <EditButtons handleSubmit={handleSubmit} handleDelete={handleDelete} canDelete={canDelete} />
    </form>

    {artist.ArtistId > -1 && <div>
      <h2>Albums</h2>
      {albumElements}
    </div>}
  </div>
  );
};

export default ArtistContainer;

