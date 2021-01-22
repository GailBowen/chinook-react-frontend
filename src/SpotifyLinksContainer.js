import React from 'react';
import { useQuery } from 'react-apollo';
import { Link, useHistory } from 'react-router-dom';

import { GET_SPOTIFY_LINKS } from './graphql/query/spotifylink';

const SpotifyLinksContainer = () => {
  const { loading, error, data } = useQuery(GET_SPOTIFY_LINKS, {
    fetchPolicy: "cache-and-network"
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return 'Loading';
  }

  return <SpotifyLinks spotifyLinks={data.getSpotifyLinks} />;
};

const SpotifyLinks = (props) => {
  const spotifyLinks = props.spotifyLinks;


  const history = useHistory();

  const output = spotifyLinks.map((x) => {

    if (spotifyLinks.length) {
      return (
        <div key={x.spotifyLinkId}>
          <Link to={{ pathname: x.Link }} target="_blank">{x.Description}</Link>
        </div>
      );
    }
    return null;

  });

  return(
    <div key="spotifyLinks">
      <h1>Spotify Links</h1>
      {output}
    </div>
  );
}

export default SpotifyLinksContainer;
