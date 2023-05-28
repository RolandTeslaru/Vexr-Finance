import { ICoinMarket } from "@/lib/types";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import Image from 'next/image';
import { Anchor } from "@mantine/core";
import Currency from 'react-currency-formatter';
import { TbArrowDownRight, TbArrowUpRight } from "react-icons/tb";
import HighLowIndicator from "../HighLowIndicator/HighLowIndicator";



const CoinRow = (coin: ICoinMarket, index: number, onClick: () => void, savedCoins: string[]) => {
  return (
    <tr key={index}>
      <td>
        <div
          style={{
            width: "auto",
            height: "auto",
            margin: "auto",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <AiOutlineStar
            size={20}
            onClick={onClick}
            color={`${savedCoins.includes(coin.id) ? "yellow" : "gray"}`}
          />
        </div>
      </td>
      <td>
        <p style={{ textAlign: "center" }}>{coin.market_cap_rank}</p>
      </td>
      <td>
        <Image src={coin.image} width={20} height={20} alt={""} />
        &nbsp; &nbsp;
        <Anchor component="button" fz="sm" display={"inline-flex"}>
          <h3>
            {coin.symbol.toUpperCase()} &nbsp;{" "}
            <span style={{ color: "GrayText", fontWeight: "400" }}>
              {" "}
              {coin.name}{" "}
            </span>
          </h3>
        </Anchor>
      </td>
      <td>
        <p style={{ textAlign: "center" }}>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(coin.current_price)}
        </p>
      </td>
      <td>
        <p
          style={{
            textAlign: "center",
            color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}`,
          }}
        >
          {coin.price_change_percentage_24h > 0 ? (
            <TbArrowUpRight scale={"43"} />
          ) : (
            <TbArrowDownRight />
          )}{" "}
          {coin.price_change_percentage_24h} %
        </p>
      </td>
      <td>
        <p style={{ textAlign: "center" }}>
          <Currency quantity={coin.market_cap} currency="USD" group="." />
        </p>
      </td>
      <td>
        <HighLowIndicator
          currentPrice={coin.current_price}
          high={coin.high_24h}
          low={coin.low_24h}
        />
      </td>
    </tr>
  );
};

export default CoinRow;
