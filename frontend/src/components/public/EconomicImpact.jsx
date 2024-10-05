import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EconomicImpactChart = () => {
  const data = [
    { name: "Earthquakes", value: 100 },
    { name: "Hurricanes", value: 300 },
    { name: "Wildfires", value: 150 },
    { name: "Floods", value: 200 },
  ];

  const COLORS = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"];

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <div className="text-center text-2xl font-bold mb-4">
        <div className="mt-2">
          Economic Impact of Natural Disasters (in billions)
        </div>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={200} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EconomicImpactChart;
