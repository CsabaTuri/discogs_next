import { gql } from "apollo-server-micro";

const message = gql`
  type MessageResponse {
    user:String!
    msg:String!
    date:String!
  }
  
`;
module.exports = message;
