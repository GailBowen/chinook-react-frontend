import { gql } from 'apollo-boost';

export const UPDATE_ARTIST = gql`
  mutation setArtist($artistId: Int, $artistName: String!) {
    setArtist(artistId: $artistId, artistName: $artistName) {
      ArtistId
      Name
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation addArtist($artistName: String!) {
    addArtist(artistName: $artistName) {
      ArtistId
      Name
    }
  }
`;

export const DELETE_ARTIST = gql`
  mutation deleteArtist($artistId: Int!) {
    deleteArtist(artistId: $artistId) 
  }
`;

const a = [];

export default a;
