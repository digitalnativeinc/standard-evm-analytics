import { AppShell, PairTable, SortableTable } from "app/components";
import {
  getApollo,
  getEthPrice,
  getPairs,
  pairsQuery,
  useInterval,
} from "app/core";

import Head from "next/head";
import React from "react";
import { useQuery } from "@apollo/client";

function PairsPage() {
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
        <title>Pairs | Analytics</title>
      </Head>
      <PairTable title="Pairs" pairs={pairs} />
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();

  // Pairs
  await getPairs(client);
  await getEthPrice();

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default PairsPage;
