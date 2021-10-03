import { gql } from"apollo-server-micro";
const user = gql`
  type UserResponse {
    token: String!
    userData: UserData!
  }
  type UserData {
    user_name: String!
    email: String!
    first_name: String!
    last_name: String!
    user_id: ID!
  }
  
`;
module.exports = user;
