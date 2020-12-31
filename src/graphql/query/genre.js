import { gql } from 'apollo-boost';

const GET_GENRES = gql`
query getGenres{
  getGenres{
    GenreId
    Name
  }
}
`;

export const GetGenre = gql`
  query getGenre($genreId: Int!) {
    getGenre(genreId: $genreId) {
      Name
    }
  }
`;

export default GET_GENRES;
