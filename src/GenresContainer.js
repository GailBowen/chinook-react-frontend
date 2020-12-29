import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  const genres = props.genres.map((l) => 
    <li key={l.GenreId}><Link to={`/genre/${l.GenreId}`}>{l.Name}</Link></li>);

  const history = useHistory();

  const handleAddGenreClick = () => {
    history.push('/addGenre');
  };

  return(
    <>
    <div className="page">
      <h1>Genres</h1>
      <AddButton handleClick={handleAddGenreClick} caption="Add Genre" />
      <div className="list genreList">
        <ul>
          {genres}
        </ul>
      </div>
      <AddButton handleClick={handleAddGenreClick} caption="Add Genre" />
    </div>
    </>
  );
}

const AddButton = (props) => {
  const handleClick = props.handleClick;
  const caption = props.caption;
  
  return (
    <div className="buttons">
      <button onClick={handleClick} className="add">{caption}</button>
    </div>
  );
};

export default GenresContainer;
