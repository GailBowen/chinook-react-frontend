import React, { useState } from 'react';
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

  let { loading, error, data } = useQuery(GET_ARTIST, {
    variables: { artistId },
    fetchPolicy: "cache-and-network"
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return "Loading";
  }

  return <Artist artist={data.getArtist} albums={data.getAlbumsByArtist} />
};

const Artist = (props) => {
  const [artist, setArtist] = useState(props.artist);
  const albums = props.albums;

  const history = useHistory();

  const [updateArtist] = useMutation(UPDATE_ARTIST);

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
        <KeyValue label="Artist Id" value={artist.ArtistId} />
        <KeyValueEditable label="Name" defaultValue={artist.Name} handleChange={handleNameChange} />
      </div>
      <EditButtons handleSubmit={handleSubmit} handleDelete={handleDelete} canDelete={canDelete} />
    </form>

    <h2>Albums</h2>
    {albumElements}
  </div>
  );

};

export default ArtistContainer;

