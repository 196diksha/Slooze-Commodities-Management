"use client";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: `${apiUrl}/graphql` });

    const authLink = setContext((_, { headers }) => {
      const authRaw = typeof window !== 'undefined' ? localStorage.getItem('slooze.auth') : null;
      const parsed = authRaw ? JSON.parse(authRaw) : null;
      const token = parsed?.token;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
