import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import { GET_ALBUM } from './graphql/query/album';

const AlbumContainer = () => { 
  let { albumId } = useParams();
  albumId = parseInt(albumId);

  const initAlbumData = {
    AlbumId: -1,
    Name: '',
    ArtistId: -1,
    ArtistName: '',
  };

  const [album, setAlbum] = useState(initAlbumData);
  const [tracks, setTracks] = useState([]);

  let { loading, error, data } = useQuery(GET_ALBUM, {
    variables: { albumId }
  });

  useEffect(() => {
    if (data) {
      if (data.getAlbum) {
        setAlbum(data.getAlbum);
      }

      if (data.getTracksByAlbum) {
        setTracks(data.getTracksByAlbum);
      }
    }
  }, [data])


  if (error) {
    throw(error);
  }

  if (loading) return 'Loading';

  return <Album album={album} tracks={tracks} />
};

const Album = (props) => {
  const album = props.album;
  const tracks = props.tracks;

  const trackElements = tracks.map((l,i) => {
    const no = i+1;
    return <div key={i}><Link to={`/track/${l.TrackId}`}>{no}. {l.Name}</Link></div>
  });

  return ( 
    <>
      <div className="page">
        <h1>Album</h1>
        <span>{album.Title} by {album.ArtistName}</span>
        <h2>Tracks</h2>
        {trackElements}
      </div>
    </>
  );
}

export default AlbumContainer;

