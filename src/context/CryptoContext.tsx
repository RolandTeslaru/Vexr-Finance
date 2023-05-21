import useAxios from "@/hooks/useAxios";
import { ICoinTrendingList, ICoinMarket } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import React, { useState, createContext, useContext, useLayoutEffect } from "react";
import { AiFillWarning } from "react-icons/ai";

interface ICryptoContext {
  marketData: ICoinMarket[] | null;
  marketLoading: boolean;
  marketError: any;

  trendingData: ICoinTrendingList[] | null;
  trendingLoading: boolean;
  trendingError: any;
}

export const CryptoContext = createContext<ICryptoContext>({
  marketData: null,
  marketLoading: true,
  marketError: null,

  trendingData: null,
  trendingLoading: true,
  trendingError: null,
});

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let { response: marketData, loading: marketLoading, error: marketError } = useAxios<ICoinMarket[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en`
  );

  if (marketError) {
    console.log("MARKET ERROR", marketError);
    notifications.show({
      title: "Error",
      message: "Unable to fetch data from the server",
      color: "red",
      icon: <AiFillWarning />,
    });
  }

  let { response: trendingData, loading: trendingLoading, error: trendingError } = useAxios<ICoinTrendingList>(
    "search/trending"
  );

  return (
    <CryptoContext.Provider
      value={{
        marketData,
        marketLoading,
        marketError,
        //@ts-expect-error
        trendingData,
        trendingLoading,
        trendingError,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
