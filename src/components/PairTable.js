import { Box } from "@material-ui/core";
import Link from "./Link";
import { PAIR_DENY } from "app/core/constants";
import PairIcon from "./PairIcon";
import Percent from "./Percent";
import React from "react";
import SortableTable from "./SortableTable";
import { currencyFormatter, formatDecimal } from "app/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { pricesQuery } from "core/queries/prices";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function PairTable({ pairs, title, ...rest }) {
  const classes = useStyles();

  const {
    data: { prices: bundles },
  } = useQuery(pricesQuery, {
    variables: { aliases: ["METIS"] },
    pollInterval: 60000,
  });

  const rows = pairs
    .filter((row) => {
      return !PAIR_DENY.includes(row.id);
    })
    .map((pair) => {
      // const volumeUSD = pair?.volumeUSD === "0" ? pair?.untrackedVolumeUSD : pair?.volumeUSD
      // const oneDayVolumeUSD = pair?.oneDay?.volumeUSD === "0" ? pair?.oneDay?.untrackedVolumeUSD : pair?.oneDay?.volumeUSD
      // const twoDayVolumeUSD = pair?.twoDay?.volumeUSD === "0" ? pair?.twoDay?.untrackedVolumeUSD : pair?.twoDay?.volumeUSD

      // const volumeUSD =
      //   pair?.volumeUSD === "0" ? pair?.untrackedVolumeUSD : pair?.volumeUSD;

      // const oneDayVolumeUSD =
      //   pair?.oneDay?.volumeUSD === "0"
      //     ? pair?.oneDay?.untrackedVolumeUSD
      //     : pair?.oneDay?.volumeUSD;

      // const sevenDayVolumeUSD =
      //   pair?.sevenDay?.volumeUSD === "0"
      //     ? pair?.sevenDay?.untrackedVolumeUSD
      //     : pair?.sevenDay?.volumeUSD;

      // const oneDayVolume = volumeUSD - oneDayVolumeUSD;
      // const oneDayFees = oneDayVolume * 0.003;
      // const oneYearFees = (oneDayVolume * 0.003 * 365 * 100) / pair.reserveUSD;
      // const sevenDayVolume = volumeUSD - sevenDayVolumeUSD;

      return {
        ...pair,
        displayName: `${pair.token0.symbol.replace(
          "WETH",
          "ETH"
        )}-${pair.token1.symbol.replace("WETH", "ETH")}`,
        liquidity: pair.reserveETH,
        token0Amt: pair.reserve0,
        token1Amt: pair.reserve1,
        // oneDayVolume: !Number.isNaN(oneDayVolume) ? oneDayVolume : 0,
        // sevenDayVolume: !Number.isNaN(sevenDayVolume) ? sevenDayVolume : 0,
        // oneDayFees: !Number.isNaN(oneDayFees) ? oneDayFees : 0,
        // oneYearFees,
      };
    });

  return (
    <div className={classes.root}>
      <SortableTable
        orderBy="reserveUSD"
        title={title}
        {...rest}
        columns={[
          {
            key: "displayName",
            numeric: false,
            render: (row, index) => (
              <Box display="flex" alignItems="center">
                <PairIcon base={row.token0} quote={row.token1} />
                <Link href={`/pairs/${row.id}`} variant="body2" noWrap>
                  {row.displayName}
                </Link>
              </Box>
            ),
            label: "Name",
          },
          {
            key: "liquidity",
            render: (row) => {
              console.log(row);
              return currencyFormatter.format(
                row.reserveETH * bundles[0].price
              );
            },
            align: "right",
            label: `Liquidity`,
          },
          // {
          //   key: "reserveUSD",
          //   render: (row) => currencyFormatter.format(row.reserveUSD),
          //   align: "right",
          //   label: "Liquidity",
          // },
          // {
          //   key: "oneDayVolume",
          //   render: (row) => currencyFormatter.format(row.oneDayVolume),
          //   align: "right",
          //   label: "Volume (24h)",
          // },
          // {
          //   key: "sevenDayVolume",
          //   render: (row) => currencyFormatter.format(row.sevenDayVolume),
          //   align: "right",
          //   label: "Volume (3d)",
          // },
          // {
          //   key: "oneDayFees",
          //   render: (row) => currencyFormatter.format(row.oneDayFees),
          //   align: "right",
          //   label: "Fees (24h)",
          // },
          // {
          //   key: "sevenDayFees",
          //   render: (row) =>
          //     currencyFormatter.format(row.sevenDayVolume * 0.003),
          //   align: "right",
          //   label: "Fees (3d)",
          // },
          // {
          //   key: "oneYearFees",
          //   render: (row) => <Percent percent={row.oneYearFees} />,
          //   align: "right",
          //   label: "Fees (Yearly)",
          // },
        ]}
        rows={rows}
      />
    </div>
  );
}
