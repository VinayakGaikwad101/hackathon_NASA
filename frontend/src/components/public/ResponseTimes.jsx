import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ResponseTimesChart = () => {
  const data = [
    { type: "Earthquake", responseTime: 10, severity: 8 },
    { type: "Hurricane", responseTime: 14, severity: 7 },
    { type: "Wildfire", responseTime: 20, severity: 6 },
    { type: "Flood", responseTime: 12, severity: 9 },
  ];

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <div className="text-center text-2xl font-bold mb-4">
        <div className="mt-2">Disaster Response Times (in hours)</div>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="category" dataKey="type" name="Disaster Type" />
          <YAxis
            type="number"
            dataKey="responseTime"
            name="Response Time (hours)"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Disasters" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTimesChart;
