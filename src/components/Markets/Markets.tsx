import { Anchor, Box, Center, Paper, ScrollArea, SegmentedControl, Table, TabsProps, rem } from '@mantine/core'
import React, { useContext, useState} from 'react'
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
    TbMoon,
    TbSun,
  } from "react-icons/tb";
  import { notifications } from "@mantine/notifications";
import { CryptoContext } from '@/context/CryptoContext';
import HighLowIndicator from '../HighLowIndicator/HighLowIndicator';
import s from "./Markets.module.scss"
import { Tabs, Skeleton } from '@mantine/core';
import {AiOutlineStar} from "react-icons/ai";
import { StorageContext } from '@/context/StorageContext';

const MarketTabs = ({ activeTab, setActiveTab }: any) => {
    return (
      <SegmentedControl
        value={activeTab}
        onChange={(value: "coins" | "favorites") => setActiveTab(value)}
        color="yellow"
        data={[
          {
            value: "coins",
            label: (
              <Center>
                <TbSun size="1rem" />
                <Box ml={10}>All Currencies</Box>
              </Center>
            ),
          },
          {
            value: "favorite",
            label: (
              <Center>
                <TbMoon size="1rem" />
                <Box ml={10}>Favorites</Box>
              </Center>
            ),
          },
        ]}
      ></SegmentedControl>
    );
}

const Markets = () => {

    let {marketData, marketLoading, marketError} = useContext(CryptoContext);
    console.log("MARKET DATA", marketData)

    const [activeTab, setActiveTab] = useState<"coins" | "favorites">("coins")

    const {saveCoin, savedCoins} = useContext(StorageContext);
    console.log("saved Coins ", savedCoins);

    const onClickStar = (coinId: string) => {
        console.log("Star with id ", coinId, "clicked")
        saveCoin(coinId)
    }

  return (
    <Paper className={s.Markets} p="xl" radius="md">
        <div className={s.Header}>
            <h1>Markets</h1>
            <div style={{height: "fit-content" , margin: "auto 0"}}>
                <MarketTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
            
        </div>
          
        <ScrollArea>
            <Table verticalSpacing="xs">
                <thead>
                    <th> </th>
                    <th>Rank</th>
                    <th>Currency</th>
                    <th>Price</th>
                    <th>24H</th>
                    <th>Market Cap</th>
                    <th>Low/High Rate</th>
                </thead>
                <tbody>
                    {activeTab === "coins" ? 
                    marketLoading ? 
                    [...Array(20)].map((_, index) => ( 
                    <tr key={index}>
                        <td></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>
                        <td> <Skeleton height={10}  mb="xl"/></td>

                    </tr>
                    )) : 
                    marketData?.map((coin , index) => (
                        <tr key={index}>
                            <td>
                                <div style={{width: "auto", height: "auto", margin: "auto", display: "flex", cursor: "pointer"}}>
                                    <AiOutlineStar size={20} onClick={(event) => {
                                        onClickStar(coin.id);
                                        event.preventDefault();
                                        console.log("All saved coins", savedCoins)
                                    }}
                                        color={`${savedCoins.includes(coin.id) ? "yellow" : "gray"}`}
                                    />
                                </div> 
                            </td>
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
                                <HighLowIndicator currentPrice={coin.current_price} high={coin.high_24h} low={coin.low_24h} />
                            </td>
                        </tr>
                    )) : <>
                        Saved Coins
                    </>
                    
                }
                </tbody>
            </Table>
        </ScrollArea>
    </Paper>
  )
}

export default Markets