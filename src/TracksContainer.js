import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_TRACKS = gql`
{
  getTracks{
    TrackId
    Name
  }
}
`;

const TracksContainer = () => (
  <Query query={GET_TRACKS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Tracks tracks={data.getTracks} />;
    }}
  </Query>
);

const Tracks = (props) => {
  const tracks = props.tracks.map((l,i) => <li key={i}>{l.Name}</li>);

  return(
    <>
    <ul>
      {tracks}
    </ul>
    </>
  );
}

export default TracksContainer;






