import { gql } from 'apollo-boost';

export const UpdateMutation = gql`
  mutation setGenre($genreId: Int, $genreName: String!) {
    setGenre(genreId: $genreId, genreName: $genreName) {
      GenreId
      Name
    }
  }
`;

export const DeleteMutation = gql`
  mutation deleteGenre($genreId: Int!) {
    deleteGenre(genreId: $genreId) 
    
  }
`;

export const InsertMutation = gql`
  mutation addGenre($genreName: String!) {
    addGenre(genreName: $genreName) {
      GenreId
      Name
    }
  }
`;

const a = [];

export default a;

