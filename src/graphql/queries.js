import { gql } from 'apollo-boost';

const queries = {};

export const ARTIST_FRAGMENT = gql`
fragment ArtistFragment on Artist {
  ArtistId
  Name
}
`;

export const GET_ARTISTS = gql`
{
  getArtists{
    ...ArtistFragment
  }
}
${ARTIST_FRAGMENT}
`;

export const GET_GENRES = gql`
query getGenres{
  getGenres{
    GenreId
    Name
  }
}
`;

export default queries;

