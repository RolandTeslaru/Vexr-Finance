import { Grid, Paper, createStyles, rem } from '@mantine/core';
import React from 'react'
import useAxios from '../hooks/useAxios';
import { CoinCard } from '../CoinCard/CoinCard';

interface ICoin { 
    item: {
        id: string;
        coin_id: string;
        name: string;
    };
}
interface ICoinList {
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
    const { response, loading, error } = useAxios<ICoinList>("search/trending");

    return (
        <Paper w={"80%"} p="xl" radius="md" className={classes.paper}>
            <section>
                <h1>Trending</h1>
                <div style={{display: "inline-grid", width: "100%", flexDirection: "row"}}>
                    {loading ? (
                        [...Array(8)].map((_, index) => (
                                <CoinCard isSkeleton={true} key={index} />
                        ))
                    ) : (
                        response?.coins.map((coin, index) => (
                                <CoinCard
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
                        ))
                    )}

                </div>
            </section>
        </Paper>
    );
};

export default Trending