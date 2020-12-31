import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_ARTISTS = gql`
query getArtistAlbums($artistId: Int!) {
  getArtist(artistId: $artistId) {
    Name
  }
  getAlbumsByArtist(artistId: $artistId) {
    AlbumId
    Title
  }
}
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
  const albumElements = props.albums.map((l,i) => {
    return ( 
        <li key={l.AlbumId}>
          <Link to={`/album/${l.AlbumId}`}>{l.Title}</Link>
        </li> );
  });

  return (
  <div key={props.artist.ArtistId}>
    <h1>Artist: {props.artist.Name}</h1>
    <h2>Albums</h2>
    <ul>
      {albumElements}
    </ul>
  </div>
  );

};

export default ArtistContainer;

