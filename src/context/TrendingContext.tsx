import useAxios from "@/hooks/useAxios";
import { ICoinTrendingList, ICoinMarket } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { StorageContext } from "./StorageContext";

interface ITrendingContext {
    trendingData: ICoinTrendingList | null;
    trendingLoading: boolean;
    trendingError: any;
}

export const TrendingContext = createContext<ITrendingContext>({
    trendingData: null,
    trendingLoading: true,
    trendingError: null,
});

export const TrendingProvider = ({ children }: any) => {

    let {response: trendingData, loading: trendingLoading, error: trendingError} = useAxios<ICoinTrendingList>(
        "https://api.coingecko.com/api/v3/search/trending"
    )

    let {trendingData: storedTrendingData, updateTrendingData} = useContext(StorageContext);

    if(trendingError) {
        console.log("TRENDING ERROR", trendingError);
        notifications.show({
            title: "Error",
            message: "Unable to fetch Trending Data from the server",
            color: "red",
            icon: <AiFillWarning />
        })
    }
    useEffect(() => {
        if(!storedTrendingData && trendingData)
            updateTrendingData(trendingData);
    }, [storedTrendingData, trendingData, updateTrendingData])
   

    return (
        <TrendingContext.Provider
            value={{
                trendingData,
                trendingLoading,
                trendingError,
            }}
        >
            {children}
        </TrendingContext.Provider>
    )
}

