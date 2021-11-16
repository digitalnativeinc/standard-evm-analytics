import { barHistoriesQuery, barQuery, barUserQuery } from "../queries/bar";

import { getApollo } from "../apollo";
import { XSTND_ADDRESS } from "../constants";
import { getNetwork } from "core/state";

export async function getBar(client = getApollo(), chainId = getNetwork()) {
  const { data } = await client.query({
    query: barQuery,
    variables: {
      id: XSTND_ADDRESS[chainId],
    },
    context: {
      clientName: "bar",
    },
  });

  await client.cache.writeQuery({
    query: barQuery,
    data,
  });

  return await client.cache.readQuery({
    query: barQuery,
  });
}

export async function getBarHistories(
  client = getApollo(),
  chainId = getNetwork()
) {
  const { data } = await client.query({
    query: barHistoriesQuery,
    variables: {
      id: XSTND_ADDRESS[chainId],
    },
    context: {
      clientName: "bar",
    },
  });

  await client.cache.writeQuery({
    query: barHistoriesQuery,
    data,
  });

  return await client.cache.readQuery({
    query: barHistoriesQuery,
  });
}

export async function getBarUser(id, client = getApollo()) {
  const { data } = await client.query({
    query: barUserQuery,
    variables: {
      id,
    },
    context: {
      clientName: "bar",
    },
  });

  await client.cache.writeQuery({
    query: barUserQuery,
    data,
  });

  return await client.cache.readQuery({
    query: barUserQuery,
  });
}
