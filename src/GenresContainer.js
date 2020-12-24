import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';

import './App.css';

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

  const history = useHistory();

  const handleAddGenreClick = () => {
    history.push('/addGenre');
  };

  return(
    <>
    <div className="page">
      <h1>Genres</h1>
      <div className="list genreList">
        <ul>
          {genres}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={handleAddGenreClick} className="add">Add Genre</button>
      </div>
    </div>
    </>
  );
}

export default GenresContainer;



