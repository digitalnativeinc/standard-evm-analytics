import { AppShell, Curves, KPI } from "app/components";
import { Grid, Paper } from "@material-ui/core";
import {
  bondedStrategyHistoriesQuery,
  bondedStrategyPairsQuery,
  bondedStrategyQuery,
  dayDatasQuery,
  ethPriceQuery,
  factoryQuery,
  getApollo,
  getBondedStrategy,
  getBondedStrategyHistories,
  getDayData,
  getEthPrice,
  getFactory,
  getSushiToken,
  tokenQuery,
  useInterval,
} from "app/core";

// import Chart from "../../components/Chart";
import Head from "next/head";
import { ParentSize } from "@visx/responsive";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { FACTORY_ADDRESS, STND_ADDRESS } from "app/core/constants";
import { useNetwork } from "state/network/hooks";

const useStyles = makeStyles((theme) => ({
  charts: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function DividendPage() {
  // const classes = useStyles();
  const chainId = useNetwork();

  // const theme = useTheme();

  const {
    data: { bondedStrategy },
  } = useQuery(bondedStrategyQuery);

  const {
    data: { bondedStrategyHistories: histories },
  } = useQuery(bondedStrategyHistoriesQuery);

  const { data: bondedStrategyPairsQueryResult } = useQuery(
    bondedStrategyPairsQuery
  );

  const bondedStrategyPairs =
    bondedStrategyPairsQueryResult?.bondedStrategyPairs ?? [];

  const {
    data: { token },
  } = useQuery(tokenQuery, {
    variables: {
      id: STND_ADDRESS[chainId],
    },
  });

  const {
    data: { bundles },
  } = useQuery(ethPriceQuery);

  const sushiPrice =
    parseFloat(token?.derivedETH) * parseFloat(bundles[0].ethPrice);

  // const pairs = bondedStrategyPairs?.map((pair) => {
  //   const claimedRewardUSD = parseFloat(pair?.claimedRewardUSD ?? "0");
  //   const remainingRewardUSD =
  //     parseFloat(pair?.remainingRewardETH) *
  //     parseFloat(bundles[0]?.ethPrice ?? "0");
  //   const claimedReward = parseFloat(pair?.claimedReward ?? "0") / 1e18;

  //   const totalRewardShare =
  //     claimedRewardUSD / parseFloat(bondedStrategy.totalRewardUSD);

  //   return {
  //     ...pair,
  //     claimedRewardUSD,
  //     remainingRewardUSD,
  //     claimedReward,
  //     totalRewardShare,
  //   };
  // });

  useInterval(async () => {
    await Promise.all([
      getBondedStrategy,
      getBondedStrategyHistories,
      getDayData,
      getFactory,
      getSushiToken,
      getEthPrice,
    ]);
  }, 60000);

  const inception = Math.floor(bondedStrategy.inception / 86400);

  const {
    totalSupply,
    totalSupplyUSD,
    usersCount,
    totalClaimedUSD,
    remainingRewardUSD,
    totalRewardUSD,
    apr,
    apy,
  } = histories.reduce(
    (previousValue, currentValue, i) => {
      const date = currentValue.date * 1000;
      // const dayData = dayDatas.find((d) => d.date === currentValue.date);
      const totalSupplyDecimals = parseFloat(currentValue.totalSupply) / 1e18;
      previousValue["totalSupply"].push({
        date,
        value: totalSupplyDecimals,
      });
      previousValue["totalSupplyUSD"].push({
        date,
        value: parseFloat(currentValue.totalSupplyUSD),
      });

      previousValue["usersCount"].push({
        date,
        value: parseFloat(currentValue.usersCount),
      });
      previousValue["totalClaimedUSD"].push({
        date,
        value: parseFloat(currentValue.totalClaimedUSD),
      });
      previousValue["remainingRewardUSD"].push({
        date,
        value: parseFloat(currentValue.remainingRewardUSD),
      });
      const totalRewardUSD =
        parseFloat(currentValue.totalClaimedUSD) +
        parseFloat(currentValue.remainingRewardUSD);

      previousValue["totalRewardUSD"].push({
        date,
        value: totalRewardUSD,
      });

      const dateFromInception = currentValue.date / 86400 - inception;
      const r = totalRewardUSD / parseFloat(currentValue.totalSupplyUSD);
      const apr = (Math.pow(r + 1, 1 / (dateFromInception + 1)) - 1) * 365;

      // if (i > 0) {
      //   const previousTotalRewardUSD = previousValue.totalRewardUSD[i - 1];
      //   console.log(previousTotalRewardUSD.value, totalRewardUSD);
      //   console.log(
      //     totalRewardUSD - previousTotalRewardUSD.value,
      //     currentValue.totalSupplyUSD
      //   );
      //   const apr =
      //     ((totalRewardUSD - previousTotalRewardUSD.value) /
      //       parseFloat(currentValue.totalSupplyUSD)) *
      //     365;

      previousValue["apr"].push({
        date,
        value: parseFloat(apr * 100),
      });
      previousValue["apy"].push({
        date,
        value: parseFloat((Math.pow(1 + apr / 365, 365) - 1) * 100),
      });

      return previousValue;
    },
    {
      totalSupply: [],
      totalSupplyUSD: [],
      usersCount: [],
      totalClaimedUSD: [],
      remainingRewardUSD: [],
      remainingRewardETH: [],
      totalRewardUSD: [],
      apr: [],
      apy: [],
    }
  );

  const averageApy =
    apy.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.value;
    }, 0) / apy.length;

  const currentApy = apy[0].value ?? 0;
  const currentTotalSupply = totalSupply[0]?.value ?? 0;
  const currentUsers = usersCount[0]?.value ?? 0;
  const currentTotalRewardUSD = totalRewardUSD[0]?.value ?? 0;
  const currentRemainingRewardUSD = remainingRewardUSD[0]?.value ?? 0;
  const currentTotalClaimedUSD = totalClaimedUSD[0]?.value ?? 0;

  // const oneDayVolume = factory.volumeUSD - factory.oneDay.volumeUSD;

  // const APR = ((oneDayVolume * 0.05 * 0.01) / bondedStrategy.totalSupply) * 365;

  // const APY = Math.pow(1 + APR / 365, 365) - 1;
  return (
    <AppShell>
      <Head>
        <title>Dividend | Standard Protocol Analytics</title>
      </Head>
      {/* <pre>{JSON.stringify(bar, null, 2)}</pre> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* <Grid item xs>
              <KPI
                title="xSushi Age"
                value={parseFloat(bar.xSushiAge).toLocaleString()}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <KPI title="APY" value={currentApy * 100} format="percent" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI title="APY (Avg)" value={averageApy} format="percent" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI
                title="Total Rewards (USD)"
                value={currentTotalRewardUSD}
                format="currency"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI
                title="Remaining Rewards (USD)"
                value={currentRemainingRewardUSD}
                format="currency"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI
                title="Claimed Rewards (USD)"
                value={currentTotalClaimedUSD}
                format="currency"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI
                title="Staked STND"
                value={currentTotalSupply}
                format="integer"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPI title="Users" value={currentUsers} format="integer" />
            </Grid>

            {/* <Grid item xs={12} sm={6} md={3}>
              <KPI
                title="Sushi"
                value={parseInt(bar.sushiStaked).toLocaleString()}
              />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  data={[apy, apr]}
                  labels={["APY", "APR"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  data={[totalSupplyUSD, totalRewardUSD]}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  labels={["STND Staked (USD)", "Total Rewards (USD)"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  data={[totalSupply]}
                  labels={["STND Staked (#)"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  data={[totalClaimedUSD]}
                  labels={["Claimed Reward (USD)"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  data={[remainingRewardUSD]}
                  labels={["Remaining Reward (USD)"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            style={{ display: "flex", height: 400, flex: 1 }}
          >
            <ParentSize>
              {({ width, height }) => (
                <Curves
                  width={width}
                  height={height}
                  margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                  data={[usersCount]}
                  labels={["Users"]}
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
      </Grid>
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();
  await getBondedStrategy(client);
  await getBondedStrategyHistories(client);
  await getFactory(client);
  await getDayData(client);
  await getSushiToken(client);
  await getEthPrice(client);
  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default DividendPage;
