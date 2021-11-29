import { AppShell, PairTable, PoolTable } from "app/components";
import {
  getApollo,
  getEthPrice,
  getPairs,
  getPools,
  pairsQuery,
  poolsQuery,
  useInterval,
} from "app/core";

import Head from "next/head";
import React from "react";
import { useQuery } from "@apollo/client";
import { pricesQuery } from "core/queries/prices";

function RecentPairsPage() {
  const {
    data: { pairs },
  } = useQuery(pairsQuery);

  const {
    data: { prices: bundles },
  } = useQuery(pricesQuery, {
    variables: { aliases: ["METIS"] },
    pollInterval: 60000,
  });

  useInterval(async () => {
    await Promise.all([getPairs, getEthPrice]);
  }, 60000);
  return (
    <AppShell>
      <Head>
        <title>Recently Added Pairs | Analytics</title>
      </Head>
      <PairTable pairs={pairs} orderBy="timestamp" order="desc" />
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();
  await getPairs(client);
  await getEthPrice();

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default RecentPairsPage;
