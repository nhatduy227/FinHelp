import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Graph(props: any) {
  let ticker = props.ticker;
  const [data, setData] = useState([]);
  const DateFormatter = (date: any) => {
    return moment(date).format("HH:mm");
  };
  const getData = async (ticker: any) => {
    try {
      const response = await fetch(
        `http://52.91.101.112:5000/quote/list?symbol=${ticker}&daynum=10&resolution=1`
      );

      let res = await response.json();
      let data = res.data;
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
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#85F485" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#85F485" stopOpacity={0.25} />
          </linearGradient>
        </defs>
        <Area dataKey="close" stroke="#85F485" fill="url(#color)" />
        <XAxis
          dataKey="date"
          minTickGap={50}
          axisLine={false}
          tickLine={false}
          tickFormatter={DateFormatter}
        />
        <YAxis
          dataKey="close"
          type="number"
          domain={["dataMin - 5, dataMax + 5"]}
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number}`}
        />
        <Tooltip />
        <CartesianGrid opacity={0.7} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graph;
