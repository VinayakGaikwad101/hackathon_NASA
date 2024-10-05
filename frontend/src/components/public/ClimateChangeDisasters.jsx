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

const ClimateChangeDisasters = () => {
  const climateData = [
    { year: "2000", disasters: 80, tempRise: 0.2, seaLevelRise: 1.2 },
    { year: "2001", disasters: 90, tempRise: 0.21, seaLevelRise: 1.3 },
    { year: "2002", disasters: 100, tempRise: 0.23, seaLevelRise: 1.4 },
    { year: "2003", disasters: 110, tempRise: 0.25, seaLevelRise: 1.5 },
    { year: "2004", disasters: 120, tempRise: 0.27, seaLevelRise: 1.6 },
    { year: "2005", disasters: 130, tempRise: 0.3, seaLevelRise: 1.7 },
    { year: "2006", disasters: 140, tempRise: 0.32, seaLevelRise: 1.8 },
    { year: "2007", disasters: 150, tempRise: 0.34, seaLevelRise: 1.9 },
    { year: "2008", disasters: 160, tempRise: 0.36, seaLevelRise: 2.0 },
    { year: "2009", disasters: 170, tempRise: 0.38, seaLevelRise: 2.1 },
    { year: "2010", disasters: 180, tempRise: 0.4, seaLevelRise: 2.2 },
    { year: "2011", disasters: 190, tempRise: 0.42, seaLevelRise: 2.3 },
    { year: "2012", disasters: 200, tempRise: 0.45, seaLevelRise: 2.4 },
    { year: "2013", disasters: 210, tempRise: 0.47, seaLevelRise: 2.5 },
    { year: "2014", disasters: 220, tempRise: 0.5, seaLevelRise: 2.6 },
    { year: "2015", disasters: 230, tempRise: 0.52, seaLevelRise: 2.7 },
    { year: "2016", disasters: 240, tempRise: 0.55, seaLevelRise: 2.8 },
    { year: "2017", disasters: 250, tempRise: 0.57, seaLevelRise: 2.9 },
    { year: "2018", disasters: 260, tempRise: 0.6, seaLevelRise: 3.0 },
    { year: "2019", disasters: 270, tempRise: 0.62, seaLevelRise: 3.1 },
    { year: "2020", disasters: 280, tempRise: 0.65, seaLevelRise: 3.2 },
    { year: "2021", disasters: 290, tempRise: 0.67, seaLevelRise: 3.3 },
    { year: "2022", disasters: 300, tempRise: 0.7, seaLevelRise: 3.4 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg">
          <p className="font-bold">{`Year: ${label}`}</p>
          <p className="text-red-500">{`Disasters: ${payload[0].value}`}</p>
          <p className="text-green-500">{`Temp Rise: ${payload[1].value}°C`}</p>
          <p className="text-blue-500">{`Sea Level Rise: ${payload[2].value}m`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <div className="text-center text-2xl font-bold mb-4">
        <div className="mt-2">Climate Change and Natural Disasters</div>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={climateData} className="mx-auto">
          <Line
            type="monotone"
            dataKey="disasters"
            stroke="#FF6347"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="tempRise"
            stroke="#32CD32"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="seaLevelRise"
            stroke="#1E90FF"
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

export default ClimateChangeDisasters;
