import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import DeleteButton from './components/DeleteButton';
import KeyValue, { KeyValueEditable } from './components/KeyValue';

import './App.css';

const QUERY = gql`
  query getGenre($genreId: Int!) {
    getGenre(genreId: $genreId) {
      Name
    }
  }
`;

const UpdateMutation = gql`
  mutation setGenre($genreId: Int, $genreName: String!) {
    setGenre(genreId: $genreId, genreName: $genreName) {
      GenreId
      Name
    }
  }
`;

const DeleteMutation = gql`
  mutation deleteGenre($genreId: Int!) {
    deleteGenre(genreId: $genreId) 
    
  }
`;

const InsertMutation = gql`
  mutation addGenre($genreName: String!) {
    addGenre(genreName: $genreName) {
      GenreId
      Name
    }
  }
`;

const GenreContainer = () => {
  let genreId = useParams().genreId;
  genreId = parseInt(genreId);

  const history = useHistory();

  const initData = {
    GenreId: -1,
    Name: ''
  };

  const [genre, setGenre] = useState(initData);
  const [editGenre] = useMutation(UpdateMutation);
  const [insertGenre] = useMutation(InsertMutation);
  const [deleteGenre] = useMutation(DeleteMutation);

  const pageTitle = genreId ? 'Edit Genre' : 'Add Genre';

  let { loading, error, data } = useQuery(QUERY, {
    variables: { genreId }
  });

  if (error) {
    if (genreId) {
      throw(error);
    }
  }

  if (loading) {
    return null;
  }

  if (genreId && genre.GenreId<0) {
    setGenre({
      GenreId: genreId,
      Name: data.getGenre.Name
    });
  }

  const handleNameChange = (e) => {
    setGenre(p => ({
      GenreId: p.GenreId,
      Name: e.target.value
    }));
  };

  const updateGenre = () => {
    editGenre(
      { 
        variables: {
          genreId: genre.GenreId,
          genreName: genre.Name
        },
      })
    .then((result) => {
      history.push('/genres');
    });
  }

  const addGenre = () => {
    insertGenre(
      { 
        variables: {
          genreName: genre.Name,
        }
      })
    .then((result) => {
      history.push('/genres');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (genre.GenreId>-1) {
      updateGenre();
    } else {
      addGenre();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteGenre({
      variables: {
        genreId: genre.GenreId
      }
    })
      .then((result) => {
        history.push('/genres');
      });
  }

  return(
    <>
        <h1>{pageTitle}</h1>
        <form>
          <div className="key-values">
            {genreId ? 
              <>
                <KeyValue label="Genre Id" value={genre.GenreId} />
              </> : 
              <span></span>}
          
            <KeyValueEditable label="Name" handleChange={handleNameChange} defaultValue={genre.Name} />
          </div>
          <div>
            <div className="buttons">
              <input type="submit" value="Save" onClick={handleSubmit} />
            </div>
            {genreId ?
              <DeleteButton handleDelete={handleDelete} /> :
              <div></div>}
          </div>
        </form>
    </>
  );
}

export default GenreContainer;

