import gql from "graphql-tag";

export const pricesQuery = gql`
  query pricesQuery($aliases: [String!] = []) {
    prices(aliases: $aliases) {
      id
      price
      alias
      symbol
    }
  }
`;
