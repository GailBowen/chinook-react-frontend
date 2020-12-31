import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import { ARTIST_FRAGMENT } from './graphql/queries';

const GET_TRACKS = gql`
{
  getTracks{
    TrackId
    Name
    ArtistId
  }
  getArtists {
    ...ArtistFragment
  }
}
${ARTIST_FRAGMENT}
`;

const TracksContainer = () => (
  <Query query={GET_TRACKS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Tracks tracks={data.getTracks} artists={data.getArtists} />;
    }}
  </Query>
);

const Tracks = (props) => {
  const tracks = props.tracks;
  const artists = props.artists;

  const indexedTracks = artists.map((a) => {

    const aTracks = tracks.filter((t) => {
      return t.ArtistId===a.ArtistId;
    }).map((t) => {
      return (
        <div className="track" key={t.TrackId}>
          <Link to={`/track/${t.TrackId}`}>{t.Name}</Link>
        </div>
      );

    });

    if (aTracks.length) {
      return (
        <div key={a.ArtistId}>
          <h2 key={a.ArtistId}>{a.Name}</h2>
          {aTracks}
        </div>
      );
    }

    return null;

  });

  return(
    <div key="tracks">
      <h1>Tracks</h1>
      {indexedTracks}
    </div>
  );
}

export default TracksContainer;






