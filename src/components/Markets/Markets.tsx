import { Anchor, Paper, ScrollArea, Table } from '@mantine/core'
import React, { useContext} from 'react'
import useAxios from '../../hooks/useAxios';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import {
    TbPlus,
    TbDiscount2,
    TbReceipt2,
    TbCoin,
    TbArrowUpRight,
    TbArrowDownRight,
  } from "react-icons/tb";
  import { notifications } from "@mantine/notifications";
import { CryptoContext } from '@/context/CryptoContext';
import HighLowIndicator from '../HighLowIndicator/HighLowIndicator';

interface ICoinMarket {
    id: string;
    coin_id: string;
    name: string;
    image: string;
    score: number,
    market_cap_rank: number,
    price_btc: number,
    symbol: string,
    current_price: number,
    price_change_percentage_24h: number,
    market_cap: number,
}

const Markets = () => {

    let {marketData, marketLoading, marketError} = useContext(CryptoContext);

  return (
    <Paper w={"70%"} p="xl" radius="md">
        <h1>Markets</h1>
        <ScrollArea>
            <Table verticalSpacing="xs">
                <thead>
                    <th>Rank</th>
                    <th>Currency</th>
                    <th>Price</th>
                    <th>24H</th>
                    <th>Market Cap</th>
                    <th>Buy/Sell Rate</th>
                </thead>
                <tbody>
                    {marketLoading ? 
                    [...Array(8)].map((_, index) => ( 
                    <> dasd </>
                    )) : 
                    marketData?.map((coin , index) => (
                        <tr key={index}>
                            <td>
                                <p style={{textAlign: "center"}}>
                                    {coin.market_cap_rank}
                                </p>
                            </td>
                            <td>
                                <Image src={coin.image} width={20} height={20} alt={''} />
                                &nbsp;
                                &nbsp;
                                <Anchor component='button' fz="sm" display={"inline-flex"}>
                                    <h3>
                                        {coin.symbol.toUpperCase()} &nbsp; <span style={{color: 'GrayText', fontWeight: "400"}}> {coin.name} </span>
                                    </h3>
                                </Anchor>
                            </td>
                            <td>
                                <p style={{textAlign: "center"}}>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(coin.current_price)}
                                </p>
                            </td> 
                            <td>
                                <p style={{textAlign: "center", color: `${
                                    coin.price_change_percentage_24h > 0 ? "green" : "red"
                                }`}}>
                                    {coin.price_change_percentage_24h > 0 ? <TbArrowUpRight scale={"43"}/> : <TbArrowDownRight/> } {coin.price_change_percentage_24h} %
                                </p>
                            </td>
                            <td>
                                <p style={{textAlign: "center"}}>
                                    <Currency
                                        quantity={coin.market_cap}
                                        currency="USD"
                                        group="." 
                                    />
                                </p>
                            </td>
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    </Paper>
  )
}

export default Markets