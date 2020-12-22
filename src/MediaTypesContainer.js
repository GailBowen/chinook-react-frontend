import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_MEDIA_TYPES = gql`
{
  getMediaTypes{
    MediaTypeId
    Name
  }
}
`;

const MediaTypesContainer = () => (
  <Query query={GET_MEDIA_TYPES}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <MediaTypes mediaTypes={data.getMediaTypes} />;
    }}
  </Query>
);

const MediaTypes = (props) => {
  const mediaTypes = props.mediaTypes.map((l,i) => <li key={i}>{l.Name}</li>);

  return(
    <>
    <ul>
      {mediaTypes}
    </ul>
    </>
  );
}

export default MediaTypesContainer;




