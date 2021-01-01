import { gql } from 'apollo-boost';

import { ARTIST_FRAGMENT } from './artist';

const a = [];

const ALBUM_FRAGMENT = gql`
fragment AlbumFragment on Album {
  AlbumId
  Title
  ArtistId
}
`;

export const GET_ALBUM = gql`
query getAlbum($albumId: Int!) {
  getAlbum(albumId: $albumId) {
    ...AlbumFragment
    ArtistName
  }
  getTracksByAlbum(albumId: $albumId) {
    TrackId
    Name
  }
}
${ALBUM_FRAGMENT}
`;

export const GET_ALBUMS = gql`
{
  getAlbums{
    ...AlbumFragment
  }
  getArtists{
    ...ArtistFragment
  }
}
${ALBUM_FRAGMENT}
${ARTIST_FRAGMENT}
`;

export default a;

