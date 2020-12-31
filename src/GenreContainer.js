import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';

import KeyValue, { KeyValueEditable } from './components/KeyValue';
import EditButtons from './components/EditButtons';

import { GetGenre } from './graphql/query/genre';
import { UpdateMutation, InsertMutation, DeleteMutation } from './graphql/mutation/genre';


import './App.css';

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

  let { loading, error, data } = useQuery(GetGenre, {
    variables: { genreId },
    fetchPolicy: "cache-and-network"
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

  const canDelete = () => {
    if (genreId) {
      return true;
    }

    return false;
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
          <EditButtons handleSubmit={handleSubmit} handleDelete={handleDelete} canDelete={canDelete} />
        </form>
    </>
  );
}

export default GenreContainer;

