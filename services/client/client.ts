import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache, ErrorPolicy } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const createClient:any = (token?:string) => {
  const defaultOptions:DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy:<ErrorPolicy> 'always',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy:<ErrorPolicy> 'always',
    },
    mutate: {
      errorPolicy: 'all',
    },
  };
  const httpLink = createHttpLink({
    uri: `${process.env.BASE_URL}api/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    
    if (!!token) {
      return {
        headers: {
          ...headers,
          authorization: token,
        },
      };
    }
    return {
      headers: {
        ...headers,
      },
    };
  });

  const client = new ApolloClient({
    uri: `${process.env.BASE_URL}api/graphql`,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions
  });
  return client;
};
export default createClient;
