import { gql } from 'apollo-boost';

export const UPDATE_ARTIST = gql`
  mutation setArtist($artistId: Int, $artistName: String!) {
    setArtist(artistId: $artistId, artistName: $artistName) {
      ArtistId
      Name
    }
  }
`;


const a = [];

export default a;
