import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_ALBUM = gql`
query getAlbum($albumId: Int!) {
  getAlbum(albumId: $albumId) {
    AlbumId
    Title
    ArtistId
  }
  getTracksByAlbum(albumId: $albumId) {
    TrackId
    Name
  }
  
}
`;

const GET_ARTISTS = gql`
query getArtist($artistId: Int!) {
  getArtist(artistId: $artistId) {
    Name
  }
}
`;

const AlbumContainer = () => { 
  let { albumId } = useParams();
  albumId = parseInt(albumId);

  let album = null;
  let artist = null;
  let tracks = [];

  let albumLoading = false;
  let artistLoading = false;

  {
    let { loading, error, data } = useQuery(GET_ALBUM, {
      variables: { albumId }
    });

    albumLoading = loading;

    if (error) {
      throw(error);
    }

    if (!albumLoading) {
      album = data.getAlbum;
      tracks = data.getTracksByAlbum;
    }
  }

  {
    const artistId = album ? album.ArtistId : null;
    let { loading, error, data } = useQuery(GET_ARTISTS, {
      variables: { artistId },
      skip: albumLoading
    });

    artistLoading = loading;

    if (error) {
      throw(error);
    }


    if (!albumLoading && !artistLoading) {
      artist = data.getArtist;
    }
  }

  if (albumLoading || artistLoading) return 'Loading';

  return <Album album={album} artist={artist} tracks={tracks} />

};

const Album = (props) => {
  const album = props.album;
  const artist = props.artist;
  const tracks = props.tracks;

  const trackElements = tracks.map((l,i) => {
    const no = i+1;
    return <li key={i}><Link to={`/track/${l.TrackId}`}>{no}. {l.Name}</Link></li>
  });

  return ( 
    <>
      <div className="page">
        <h1>Album</h1>
        <span>{album.Title} by {artist.Name}</span>
        <h2>Tracks</h2>
        <ul>
          {trackElements}
        </ul>
      </div>
    </>
  );
}

export default AlbumContainer;

