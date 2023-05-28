import { Grid, Paper, createStyles, rem } from '@mantine/core';
import React, { useContext} from 'react'
import useAxios from '../../hooks/useAxios';
import { CoinCard } from '../CoinCard/CoinCard';
import s from "./Trending.module.scss"
import { TrendingContext } from '@/context/TrendingContext';

export interface ICoin { 
    item: {
        id: string;
        coin_id: string;
        name: string;
        small: string;
        thumb: string,
        score: number,
        market_cap_rank: number,
        price_btc: number,
        symbol: string,
    };
}
export interface ICoinList {
    coins: ICoin[];
    exchanges: any[];
}

const style = createStyles((theme) => {
    return {
        paper:{
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3],
        }
    }
})

const Trending = () => {
    const { classes } = style();
    let { trendingData, trendingLoading, trendingError } = useContext(TrendingContext)
    console.log("TRENDING DATA ", trendingData)

    return (
      <Paper w={"75%"} p="xl" radius="md" className={classes.paper}>
        <section>
          <h1>Trending</h1>
          <div className={s.gridContainer} >
            {trendingLoading
              ? [...Array(8)].map((_, index) => (
                //@ts-ignore
                  <CoinCard isSkeleton={true} key={index} />
                ))
              : trendingData?.coins.map((coin, index) => (
                  <CoinCard
                    coin = {coin}
                    data={[
                      {
                        title: coin.item.name,
                        icon: "coin",
                        value: "424",
                        diff: 342,
                      },
                    ]}
                    key={index}
                  />
                ))}
          </div>
        </section>
      </Paper>
    );
};

export default Trending