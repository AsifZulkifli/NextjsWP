import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
    headers: {
      "User-Agent": "DigitalSymphonyNextApp/1.0",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;