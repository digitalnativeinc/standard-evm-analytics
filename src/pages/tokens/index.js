import { AppShell, TokenTable } from "app/components";
import {
  getApollo,
  getTokens,
  tokensQuery,
  useInterval,
  getEthPrice,
} from "app/core";

import Head from "next/head";
import React from "react";
import { useQuery } from "@apollo/client";
import { pricesQuery } from "core/queries/prices";

function TokensPage() {
  const {
    data: { tokens },
  } = useQuery(tokensQuery);

  const {
    data: { prices: bundles },
  } = useQuery(pricesQuery, {
    variables: { aliases: ["METIS"] },
    pollInterval: 60000,
  });

  useInterval(async () => {
    await Promise.all([getTokens, getEthPrice]);
  }, 60000);

  return (
    <AppShell>
      <Head>
        <title>Tokens | Analytics</title>
      </Head>
      <TokenTable title="Tokens" tokens={tokens} />
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();

  await getEthPrice();

  // await getOneDayEthPrice(client);
  // await getSevenDayEthPrice(client);
  await getTokens(client);

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default TokensPage;
