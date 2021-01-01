import { gql } from 'apollo-boost';

export const UPDATE_ALBUM = gql `
  mutation setAlbum($albumId: Int, $albumName: String!, $albumArtist: Int!) {
    setAlbum(albumId: $albumId, albumName: $albumName, albumArtist: $albumArtist) {
      ArtistId
      Title
    }
  }
`;

export const INSERT_ALBUM = gql`
  mutation addAlbum($albumName: String!, $albumArtist: Int!) {
    addAlbum(albumName: $albumName, albumArtist: $albumArtist) {
      ArtistId
      Title
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation deleteAlbum($albumId: Int!) {
    deleteAlbum(albumId: $albumId)
  }
`;

const a = [];

export default a;

