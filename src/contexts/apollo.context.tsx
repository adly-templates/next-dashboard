'use client';

import React from 'react';
import graphqlConfig from '@/../graphql.config.json';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { getToken } from '@/utils';

const endpoint = (process.env.NEXT_PUBLIC_API_URL || graphqlConfig.schema).replace('/graphql', '');

console.log(`Connecting to GraphQL endpoint: ${endpoint}`);

const uri = `${endpoint}/graphql`;

const cacheProtocol = new InMemoryCache();

const httpLink = new HttpLink({
  uri,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  if (token)
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return forward(operation);
});

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      response.errors.forEach((err) => {
        console.log(err.message);
      });
    }
    return response;
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: cacheProtocol,
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProviderClient client={apolloClient}>{children}</ApolloProviderClient>;
};
