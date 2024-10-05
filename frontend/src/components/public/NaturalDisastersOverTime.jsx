import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NaturalDisastersOverTime = () => {
  const data = [
    { year: "2010", disasters: 100 },
    { year: "2011", disasters: 150 },
    { year: "2012", disasters: 120 },
    { year: "2013", disasters: 130 },
    { year: "2014", disasters: 170 },
    { year: "2015", disasters: 160 },
    { year: "2016", disasters: 140 },
    { year: "2017", disasters: 180 },
    { year: "2018", disasters: 190 },
    { year: "2019", disasters: 210 },
    { year: "2020", disasters: 220 },
    { year: "2021", disasters: 230 },
    { year: "2022", disasters: 240 },
    { year: "2023", disasters: 250 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg">
          <p className="font-bold">{`Year: ${label}`}</p>
          <p className="text-red-500">{`Disasters: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <div className="text-center text-2xl font-bold mb-4">
        <div className="mt-2">The Number of Natural Disasters Over Time</div>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={data} className="mx-auto">
          <Line
            type="monotone"
            dataKey="disasters"
            stroke="#FF6347"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NaturalDisastersOverTime;
