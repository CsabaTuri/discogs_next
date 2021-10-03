import { ApolloServer } from "apollo-server-micro";
import { ApolloError } from "apollo-server-errors";
import Cors from "micro-cors";
import { resolvers } from "../../services/graphql/resolvers";
import { schemaArray as typeDefs } from "../../services/graphql/typeDefs";
import "../../services/graphql/mongodb/middleware/mongodb";

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => ({
    req,
  }),
  formatError: (err) => {
    if(err.extensions){
      throw new ApolloError(err.message, err.extensions.code);
    }
    throw new ApolloError(err.message);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
export default cors((req:any, res:any) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  return server.createHandler({ path: "/api/graphql" })(req, res);
});
