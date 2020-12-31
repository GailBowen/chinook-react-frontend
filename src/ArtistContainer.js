import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import KeyValue from './components/KeyValue';
import { ARTIST_FRAGMENT } from './graphql/queries';

const GET_ARTISTS = gql`
query getArtistAlbums($artistId: Int!) {
  getArtist(artistId: $artistId) {
    ...ArtistFragment
  }
  getAlbumsByArtist(artistId: $artistId) {
    AlbumId
    Title
  }
}
${ARTIST_FRAGMENT}
`;

const ArtistContainer = () => { 
  let { artistId } = useParams();
  artistId = parseInt(artistId);

  let { loading, error, data } = useQuery(GET_ARTISTS, {
    variables: { artistId }
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
  const artist = props.artist;
  const albums = props.albums;

  const albumElements = albums.map((l,i) => {
    return ( 
        <div key={l.AlbumId}>
          <Link to={`/album/${l.AlbumId}`}>{l.Title}</Link>
        </div> );
  });

  return (
  <div key={artist.ArtistId}>
    <h1>Artist</h1>

    <form>
      <div className="key-values">
        <KeyValue label="Artist Id" value={artist.ArtistId} />
        <KeyValue label="Name" value={artist.Name} />
      </div>
    </form>

    <h2>Albums</h2>
    {albumElements}
  </div>
  );

};

export default ArtistContainer;

