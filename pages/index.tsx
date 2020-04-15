import React from 'react';
import fetch from 'node-fetch';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { DashboardLayout } from '../components/DashboardLayout';
import { WorldDashboard } from '../components/World/WorldDashboard';
import { Meta } from '../components/Meta';
import { getMetaQuery } from '../queries/getMetaQuery';
import { Stats } from '../types/Stats';

const ssrMode = !process.browser;
const link = createHttpLink({ uri: 'https://api.covidstats.com.au/graphql', ...(ssrMode ? { fetch } : {}) });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const IndexPage = ({ stats }: { stats?: Stats }) => (
  <ApolloProvider client={client}>
    <DashboardLayout countryCode="Global">
      <>
        <Meta stats={stats} countryCode="Global" />
        <WorldDashboard />
      </>
    </DashboardLayout>
  </ApolloProvider>
);

IndexPage.getInitialProps = async () => {
  const resp = await client.query({ query: getMetaQuery('Global') });
  const { data } = resp;

  return { stats: data && data.global };
};

export default IndexPage;
