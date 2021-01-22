import { gql } from 'apollo-boost';

const a = [];

const SPOTIFY_LINK_FRAGMENT = gql`
fragment SpotifyLinkFragment on SpotifyLink {
  SpotifyLinkId
  Description
  Link
}
`;

export const GET_SPOTIFY_LINKS = gql`
{
  getSpotifyLinks{
    ...SpotifyLinkFragment
  }
}
${SPOTIFY_LINK_FRAGMENT}
`;

export default a;

