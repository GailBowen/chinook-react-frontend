import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
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

const MUTATION = gql`
  mutation getGenre($genreId: Int, $genreName: String!) {
    setGenre(genreId: $genreId, genreName: $genreName) {
      GenreId
      Name
    }
  }
`;

const GenreContainer = () => {
  let pGenreId = useParams().genreId;
  pGenreId = parseInt(pGenreId);

  const history = useHistory();

  const [genreName, setGenreName] = useState('');
  const [genreId, setGenreId] = useState(pGenreId);

  const [setGenre, { mData }] = useMutation(MUTATION);

  let { loading, error, data } = useQuery(QUERY, {
    variables: { genreId }
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return null;
  }

  const genre = data.getGenre;

  const handleNameChange = (e) => {
    setGenreName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGenre(
      { 
        variables: {
          genreId: genreId,
          genreName: genreName
        }
      })
    .then((result) => {
      const r = result.data.setGenre;
      setGenreName(r.Name);
      setGenreId(r.GenreId);
      history.push('/genres');
    });
    
  };

  if (!genreName) {
    setGenreName(genre.Name);
  }

  return(
    <>
      <div className="page">
        <form>
          <span>Genre Id: </span><span>{genreId}</span><br />
          <input type="text" onChange={handleNameChange} defaultValue={genreName} /> 
          <div>
            <input type="submit" value="Save" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  );
}

export default GenreContainer;

