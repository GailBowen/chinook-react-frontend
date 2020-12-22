import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_ARTISTS = gql`
{
  getArtists{
    ArtistId
    Name
  }
}
`;

const ArtistsContainer = () => (
  <Query query={GET_ARTISTS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Artists artists={data.getArtists} />;
    }}
  </Query>
);

const Artists = (props) => {
  const artists = props.artists.map((l,i) => <li key={i}>{l.Name}</li>);

  return(
    <>
    <ul>
      {artists}
    </ul>
    </>
  );
}

export default ArtistsContainer;
