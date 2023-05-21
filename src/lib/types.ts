export interface ICoinMarket {
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
  
  export interface ICoinTrending { 
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
  
  export interface ICoinTrendingList {
    coins: ICoinTrending[];
    exchanges: any[];
  }
  