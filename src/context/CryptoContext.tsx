import useAxios from "@/hooks/useAxios";
import { ICoinTrendingList, ICoinMarket } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import React, { useState, createContext, useContext, useLayoutEffect, useEffect } from "react";
import { AiFillWarning } from "react-icons/ai";
import { StorageContext } from "./StorageContext";

interface ICryptoContext {
  marketData: ICoinMarket[] | null;
  marketLoading: boolean;
  marketError: any;


}

export const CryptoContext = createContext<ICryptoContext>({
  marketData: null,
  marketLoading: true,
  marketError: null,

});

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({children}: any) => {
  let { response: marketData, loading: marketLoading, error: marketError } = useAxios<ICoinMarket[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en`
  );

  let {marketData: storedMarketData , updateMarketData} = useContext(StorageContext); 

  if (marketError) {
    console.log("MARKET ERROR", marketError);
    notifications.show({
      title: "Error",
      message: "Unable to fetch Market Data from the server",
      color: "red",
      icon: <AiFillWarning />,
    });
  }

  useEffect(() => {
    if(!storedMarketData && marketData)
      updateMarketData(marketData);
  }, [storedMarketData, marketData, updateMarketData])

  return (
    <CryptoContext.Provider
      value={{
        marketData,
        marketLoading,
        marketError,

      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
