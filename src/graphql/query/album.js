import { gql } from 'apollo-boost';

import { ARTIST_FRAGMENT } from './artist';

const a = [];

export const GET_ALBUM = gql`
query getAlbum($albumId: Int!) {
  getAlbum(albumId: $albumId) {
    AlbumId
    Title
    ArtistId
    ArtistName
  }
  getTracksByAlbum(albumId: $albumId) {
    TrackId
    Name
  }
  getArtists {
    ...ArtistFragment
  }
}
${ARTIST_FRAGMENT}
`;

export default a;

