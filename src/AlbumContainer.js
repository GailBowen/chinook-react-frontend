import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GET_ALBUM } from './graphql/query/album';
import { GET_ARTISTS } from './graphql/query/artist';

import { UPDATE_ALBUM, INSERT_ALBUM, DELETE_ALBUM } from './graphql/mutation/album';

import EditButtons from './components/EditButtons';
import KeyValue, { KeyValueEditable, KeyValueDropDown } from './components/KeyValue';

const AlbumContainer = () => { 
  let { albumId } = useParams();
  albumId = parseInt(albumId);

  const initAlbumData = {
    AlbumId: albumId ? albumId : -1,
    Name: '',
    ArtistId: -1,
    ArtistName: '',
  };

  const [album, setAlbum] = useState(initAlbumData);
  const [albumsLoading, setAlbumsLoading] = useState(false);

  const [tracks, setTracks] = useState([]);

  const [artists, setArtists] = useState([]);
  const [artistsLoading, setArtistsLoading] = useState(false);

  const [updateAlbum] = useMutation(UPDATE_ALBUM);
  const [insertAlbum] = useMutation(INSERT_ALBUM);
  const [deleteAlbum] = useMutation(DELETE_ALBUM);

  const history = useHistory();

  {
    const { loading, error, data } = useQuery(GET_ALBUM, {
      variables: { albumId },
      fetchPolicy: "cache-and-network",
      skip: album.AlbumId === -1,
    });

    useEffect(() => {
      setAlbumsLoading(loading);
      
      if (data) {
        if (data.getAlbum) {
          setAlbum(data.getAlbum);
        }

        if (data.getTracksByAlbum) {
          setTracks(data.getTracksByAlbum);
        }
      }
    }, [data, loading]);

    if (error) {
      throw(error);
    }

  }

  {
    const { loading, error, data } = useQuery(GET_ARTISTS, { 
    });

    useEffect(() => {
      
      setArtistsLoading(loading);

      if (data && data.getArtists) {
        setArtists(data.getArtists);
      }
    }, [data, loading]);

    if (error) {
      throw(error);
    }
  }

  if (albumsLoading || artistsLoading) return 'Loading';

  const trackElements = tracks.map((l,i) => {
    const no = i+1;
    return <div key={i}><Link to={`/track/${l.TrackId}`}>{no}. {l.Name}</Link></div>
  });

  const updateAlbumField = (fieldName, newValue) => {
    setAlbum((p) => {
      const a = p;
      a[fieldName] = newValue;
      return a;
    });
  };

  const handleArtistChange = (e) => {
    updateAlbumField('ArtistId', e.target.value);
  };

  const handleTitleChange = (e) => {
    updateAlbumField('Title', e.target.value);
  };

  const handleUpdateAlbum = () => {
    updateAlbum({
      variables: {
        albumId: album.AlbumId,
        albumName: album.Title,
        albumArtist: parseInt(album.ArtistId),
      }
    }).then(() => {
      history.push('/albums');
    });
  };


  const handleInsertAlbum = () => {
    insertAlbum({
      variables: {
        albumName: album.Title,
        albumArtist: parseInt(album.ArtistId),
      }
    }).then(() => {
      history.push('/albums');
    });
  }

  const handleSave = (e) => {
    
    e.preventDefault();

    if (album.ArtistId===-1) {
      return;
    }

    if (album.Title==='') {
      return;
    }

    if (album.AlbumId===-1) {
      handleInsertAlbum();
    } else {
      handleUpdateAlbum();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deleteAlbum({
      variables: {
        albumId: album.AlbumId
      }
    }).then(() => {
      history.push('/albums');
    });
  };

  const canDelete = () => true;

  return ( 
    <>
      <div className="page">
        <h1>Album</h1>
        <form>
          <div className="key-value-rows">
            { album.AlbumId>-1 && <KeyValue label="AlbumId" value={album.AlbumId} /> }
            <KeyValueEditable label="Title" defaultValue={album.Title} handleChange={handleTitleChange} />

            <KeyValueDropDown label="Artist" items={artists} keyProp="ArtistId" 
              textProp="Name" defaultValue={album.ArtistId} handleChange={handleArtistChange} />

          </div>
          <EditButtons handleSubmit={handleSave} handleDelete={handleDelete} canDelete={canDelete} />
        </form>
        { album.AlbumId>-1 && 
        <div>
          <h2>Tracks</h2>
          {trackElements}
        </div> }
      </div>
    </>
  );
}

export default AlbumContainer;

