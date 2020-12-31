import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import generateLetters from './util/GenerateLetters';

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
  const genres = props.genres;
  const letters = generateLetters(genres.map((x) => x.Name));

  const indexedGenres = letters.map((l,k) => {
    const genresForLetter = genres.filter((g) => {
      return g.Name.startsWith(l);
    }).map((g,i) => {
      return (
        <div key={i}><Link to={`/genre/${g.GenreId}`}>{g.Name}</Link></div>
      )})

    return (
      <div key={k}>
        <h2 id={l}>{l}</h2>
        {genresForLetter}
      </div>
    );
  });
    

  const history = useHistory();

  const handleAddGenreClick = () => {
    history.push('/addGenre');
  };

  return(
    <div key="genres" className="page">
      <h1>Genres</h1>
      <AddButton handleClick={handleAddGenreClick} caption="Add Genre" />
      <div className="list genreList">
        {indexedGenres}
      </div>
      <AddButton handleClick={handleAddGenreClick} caption="Add Genre" />
    </div>
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
