import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import generateLetters from './util/GenerateLetters';

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
  const mediaTypes = props.mediaTypes;
  const letters = generateLetters(mediaTypes.map((m) => m.Name));

  const indexedMediaTypes = letters.map((l) => {

    const ms = mediaTypes.filter((mt) => mt.Name.startsWith(l)).map((mt) => {
      return (
        <div>{mt.Name}</div>
      );
    });

    return (
      <>
      <h2>{l}</h2>
      {ms}
      </>
    );

  });

  return(
    <>
    <h1>Media Types</h1>
    {indexedMediaTypes}
    </>
  );
}

export default MediaTypesContainer;




