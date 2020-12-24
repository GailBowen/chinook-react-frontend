import React from 'react';
import { Query, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import KeyValue from './KeyValue';

const QUERY = gql`
  query getTrack($trackId: Int!) {
    getTrack(trackId: $trackId) {
      Name
      AlbumId
      AlbumTitle
      Composer
      MediaTypeId
      MediaTypeName
      Milliseconds
      Bytes
      UnitPrice
    }
  }
`;

const TrackContainer = () => {
  let { trackId } = useParams();
  trackId = parseInt(trackId);

  let { loading, error, data } = useQuery(QUERY, {
    variables: { trackId }
  });

  if (loading) {
    return "Loading";
  }

  const track = data.getTrack;
  const albumLink = <Link to={`/album/${track.AlbumId}`}>{track.AlbumTitle}</Link>;

  return  (
    <>
      <h1>{track.Name}</h1>
      <KeyValue label="Name" value={albumLink} />
      <KeyValue label="Composer" value={track.Composer} />
      <KeyValue label="Media Type" value={track.MediaTypeName} />
      <KeyValue label="Length (ms)" value={track.Milliseconds} />
      <KeyValue label="Size (bytes)" value={track.Bytes} />
      <KeyValue label="Unit Price" value={track.UnitPrice} />
    </>
  );
}

export default TrackContainer;
