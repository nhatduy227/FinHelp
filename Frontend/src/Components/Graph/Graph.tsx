import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import React, { useEffect, useState } from "react";

function Graph(props: any) {
  let ticker = props.ticker;
  const configuration = {
    method: "GET",
    headers: {
      "X-API-KEY": "KuVSHSUFer7TmloSc20vi8Fvs9qapOVa2CMIKoR6",
      Accept: "application/json",
    },
  };
  const dummyData = [
    {
      date: "April 5",
      close: 4000,
    },
    {
      date: "April 6",
      close: 3210,
    },
    {
      date: "April 7",
      close: 6654,
    },
    {
      date: "April 8",
      close: 1211,
    },
    {
      date: "April 9",
      close: 3333,
    },
  ];
  const [data, setData] = useState([]);
  const getData = async (ticker: any) => {
    try {
      //   const response = await fetch(
      //     `https://yfapi.net/v8/finance/chart/${ticker}`, configuration
      //   );
      const response = await fetch(
        `https://yfapi.net/v8/finance/chart/${ticker}`
      );
      let data = await response.json();
      console.log(data);
      setData(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData(ticker);
  }, []);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={dummyData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#85F485" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#85F485" stopOpacity={0.25} />
          </linearGradient>
        </defs>
        <Area dataKey="close" stroke="#85F485" fill="url(#color)" />
        <XAxis
          dataKey="date"
          padding={{ left: 20, right: 20 }}
          minTickGap={50}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="close"
          axisLine={false}
          tickLine={false}
          tickCount={7}
          tickFormatter={(number) => `$${number}`}
        />
        <Tooltip />
        <CartesianGrid opacity={0.7} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graph;
