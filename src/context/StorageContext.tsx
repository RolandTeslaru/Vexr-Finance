import React, { createContext, useEffect, useState, useLayoutEffect } from "react";
import { ICoinMarket, ICoinTrendingList } from "@/lib/types";

interface IStorageContext {
    marketData: ICoinMarket[] | null;
    updateMarketData: (data: ICoinMarket[] | null) => void;

    trendingData: ICoinTrendingList | null;
    updateTrendingData: (data: ICoinTrendingList | null) => void;

    saveCoin: (coinId: string) => void;
    savedCoins: string[];
}

export const StorageContext = createContext<IStorageContext>({
    marketData: null,
    updateMarketData: () => {},

    trendingData: null,
    updateTrendingData: () => {},

    saveCoin: () => {},
    savedCoins: [],
});

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [marketData, setMarketData] = useState<ICoinMarket[] | null>(null);
    const [trendingData, setTrendingData] = useState<ICoinTrendingList | null>(null);
    const [savedCoins, setSavedCoins] = useState<string[]>([]);

    const saveCoin = (coinId: string) => {
        let oldCoins = JSON.parse(localStorage.getItem("savedCoins") || "[]");
      
        if (oldCoins.includes(coinId)) {
          let newCoins = oldCoins.filter((id: string) => id !== coinId);
          setSavedCoins(newCoins);
          localStorage.setItem("savedCoins", JSON.stringify(newCoins));
        } else {
          let newCoins = [...oldCoins, coinId];
          setSavedCoins(newCoins);
          localStorage.setItem("savedCoins", JSON.stringify(newCoins));
        }
      };


    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const storedMarketData = JSON.parse(
                localStorage.getItem("marketData") || "null"
            );
            setMarketData(storedMarketData);

            const storedTrendingData = JSON.parse(
                localStorage.getItem("trendingData") || "null"
            );
            setTrendingData(storedTrendingData);

            const storedSavedCoins = JSON.parse(
                localStorage.getItem("savedCoins") || "null"
            );
            setSavedCoins(storedSavedCoins);
        }


        let isSavedCoin = JSON.parse(localStorage.getItem("savedCoins") || "[]");
    }, []);

    const updateMarketData = (data: ICoinMarket[] | null) => {
        setMarketData(data);
        if (typeof window !== "undefined") {
            localStorage.setItem("marketData", JSON.stringify(data));
        }
    };

    const updateTrendingData = (data: ICoinTrendingList | null) => {
        setTrendingData(data);
        if(typeof window !== "undefined") {
            localStorage.setItem("trendingData", JSON.stringify(data));
        }
    };

    return (
        <StorageContext.Provider value={{ 
            marketData, 
            updateMarketData,
            
            trendingData,
            updateTrendingData,
            
            saveCoin,
            savedCoins
            }}>
        {children}
        </StorageContext.Provider>
    );
};
