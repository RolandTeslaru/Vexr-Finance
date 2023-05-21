import { Grid, Paper, createStyles, rem } from '@mantine/core';
import React from 'react'
import useAxios from '../../hooks/useAxios';
import { CoinCard } from '../CoinCard/CoinCard';
import s from "./Trending.module.scss"

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
    let { response, loading, error } = useAxios<ICoinList>("search/trending");
    console.log("RESPONSE TRENDING", response)
    return (
      <Paper w={"75%"} p="xl" radius="md" className={classes.paper}>
        <section>
          <h1>Trending</h1>
          <div className={s.gridContainer} >
            {loading
              ? [...Array(8)].map((_, index) => (
                //@ts-ignore
                  <CoinCard isSkeleton={true} key={index} />
                ))
              : response?.coins.map((coin, index) => (
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