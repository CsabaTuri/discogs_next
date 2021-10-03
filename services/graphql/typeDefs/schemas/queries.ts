import { gql } from"apollo-server-micro";
const queries = gql`
  type Query {
    login(user_name: String!, password: String!): UserResponse!
    registration(
      user_name: String!
      email: String!
      password: String!
      first_name: String!
      last_name: String!
    ): UserData
    user: UserResponse!
    users: [UserData]!
    message(per_page: Int!): [MessageResponse]!
    releases(id: ID!): Release
    search(
      page: String!
      per_page: String!
      query: String
      type: String
      title: String
      release_title: String
      credit: String
      artist: String
      anv: String
      label: String
      genre: String
      style: String
      country: String
      year: String
      format: String
      catno: String
      barcode: String
      track: String
      submitter: String
      contributor: String
    ): Search
    styles(style: String!, page: Int!, per_page: Int!): Search
    genres(genre: String!, page: Int!, per_page: Int!): Search
    artist(artist_id: ID!): Artist
    master(id: ID!): Master
    label(id: ID!): Label
    artistReleases(
      artist_id: ID!
      page: String!
      per_page: String!
      sort: String!
      sort_order: String!
    ): ArtistReleases
    labelReleases(label_id: ID!, page: Int!, per_page: Int!): ArtistReleases
    getFavoritesArtist: [FavArtists]
    getFavoritesMaster: [FavMasters]
    getFavoritesRelease: [FavReleases]
    getFavoritesLabel: [FavLabels]
  }
`;
module.exports = queries;
