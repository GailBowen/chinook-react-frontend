import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './App.css';

const QUERY = gql`
  query getGenre($genreId: Int!) {
    getGenre(genreId: $genreId) {
      Name
    }
  }
`;

const GenreContainer = () => {
  let { genreId } = useParams();
  genreId = parseInt(genreId);

  const [genreName, setGenreName] = useState('');

  let { loading, error, data } = useQuery(QUERY, {
    variables: { genreId }
  });

  if (loading) {
    return null;
  }

  const genre = data.getGenre;

  const handleNameChange = (e) => {
    setGenreName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (genreName!==genre.Name) {
    setGenreName(genre.Name);
  }

  return(
    <>
      <div className="page">
        <form>
          <input type="text" onChange={handleNameChange} value={genreName} /> 
          <div>
            <input type="submit" value="Save" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  );
}

export default GenreContainer;

