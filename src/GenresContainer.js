import React from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import generateLetters from './util/GenerateLetters';

import GET_GENRES from './graphql/query/genre';

import './App.css';

const GenresContainer = (props) => {

  return <Genres key={Date.now().toString()} />;
};

const Genres = (props) => {

  let { loading, error, data } = useQuery(GET_GENRES, { 
    fetchPolicy: "cache-and-network"
  });

  const history = useHistory();

  if (loading) {
    return 'Loading';
  }

  if (error) {
    throw(error);
  }

  const genres = data.getGenres;
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
