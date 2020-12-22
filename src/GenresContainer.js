import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_GENRES = gql`
{
  getGenres{
    GenreId
    Name
  }
}
`;

const GenresContainer = () => (
  <Query query={GET_GENRES}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Genres genres={data.getGenres} />;
    }}
  </Query>
);

const Genres = (props) => {
  const genres = props.genres.map((l,i) => <li key={i}>{l.Name}</li>);

  return(
    <>
    <ul>
      {genres}
    </ul>
    </>
  );
}

export default GenresContainer;



