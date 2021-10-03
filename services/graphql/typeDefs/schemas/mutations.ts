import { gql } from"apollo-server-micro";
const mutations = gql`
  type Mutation {
    add_artist_to_favorites(artist_id: ID!, artist_name: String!): Boolean
    remove_artist_from_favorites(artist_id: ID!): String
    add_label_to_favorites(label_id: ID!, label_name: String!): Boolean
    remove_label_from_favorites(label_id: ID!): String
    add_master_to_favorites(master_id: ID!, master_name: String!): Boolean
    remove_master_from_favorites(master_id: ID!): String
    add_release_to_favorites(release_id: ID!, release_name: String!): Boolean
    remove_release_from_favorites(release_id: ID!): String
    delete_acc: Boolean
  }
`;
module.exports = mutations;
