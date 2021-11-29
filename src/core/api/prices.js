import { pricesQuery } from "core/queries/prices";
import { getApollo } from "..";

export const getPrice = async (alias, client = getApollo()) => {
  const { prices } = await client.query({
    query: pricesQuery,
    variables: {
      aliases: [alias],
    },
    context: {
      clientName: "prices",
    },
  });

  await client.cache.writeQuery({
    query: pricesQuery,
    data: prices,
    variables: {
      aliases: [alias],
    },
  });

  return await client.cache.readQuery({
    query: pricesQuery,
    variables: {
      aliases: [alias],
    },
  });
};
