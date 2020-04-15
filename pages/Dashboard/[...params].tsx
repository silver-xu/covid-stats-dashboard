import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { RouteResolver } from '../../components/RouteResolver';
import { DashboardLayout } from '../../components/DashboardLayout';
import { getMetaQuery } from '../../queries/getMetaQuery';
import { Stats } from '../../types/Stats';
import { Meta } from '../../components/Meta';

const ssrMode = !process.browser;
const link = createHttpLink({ uri: 'https://api.covidstats.com.au/graphql', ...(ssrMode ? { fetch } : {}) });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const DashboardPage = ({ stats }: { stats?: Stats }) => {
  const [countryCode, stateCode] = (useRouter().query.params as string[]) || [];

  return (
    <ApolloProvider client={client}>
      <DashboardLayout countryCode={countryCode} stateCode={stateCode}>
        <>
          <Meta stats={stats} countryCode={countryCode} stateCode={stateCode} />
          <RouteResolver countryCode={countryCode} stateCode={stateCode} />
        </>
      </DashboardLayout>
    </ApolloProvider>
  );
};

DashboardPage.getInitialProps = async (ctx: any) => {
  const [countryCode, stateCode] = (ctx.query.params as string[]) || [];
  const resp = await client.query({ query: getMetaQuery(countryCode, stateCode) });
  const { data } = resp;

  return {
    stats:
      data && countryCode === 'Global'
        ? data.global
        : !stateCode
        ? data.global[countryCode]
        : data.global[countryCode][stateCode],
  };
};

export default DashboardPage;
