import { gql } from 'apollo-boost';

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

export const GET_ARTIST = gql`
query getArtist($artistId: Int!) {
  getArtist(artistId: $artistId) {
    ...ArtistFragment
  }
  getAlbumsByArtist(artistId: $artistId) {
    AlbumId
    Title
  }
}
${ARTIST_FRAGMENT}
`;


