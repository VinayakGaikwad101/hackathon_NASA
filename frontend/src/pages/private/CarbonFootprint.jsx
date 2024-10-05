import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CarbonFootprint = () => {
  const [formData, setFormData] = useState({
    electricity: "",
    gas: "",
    oil: "",
    car: "",
    flights: "",
  });

  const [footprint, setFootprint] = useState(null);

  useEffect(() => {
    const savedFootprint = localStorage.getItem("carbonFootprint");
    if (savedFootprint) {
      setFootprint(parseFloat(savedFootprint));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateFootprint = () => {
    const { electricity, gas, oil, car, flights } = formData;

    // These are rough estimates and should be refined for more accurate calculations
    const electricityFootprint = parseFloat(electricity) * 0.4; // kg CO2 per kWh
    const gasFootprint = parseFloat(gas) * 2.3; // kg CO2 per m3
    const oilFootprint = parseFloat(oil) * 2.6; // kg CO2 per liter
    const carFootprint = parseFloat(car) * 0.2; // kg CO2 per km
    const flightsFootprint = parseFloat(flights) * 250; // kg CO2 per flight (assuming average flight)

    const totalFootprint = (
      electricityFootprint +
      gasFootprint +
      oilFootprint +
      carFootprint +
      flightsFootprint
    ).toFixed(2);

    setFootprint(totalFootprint);
    localStorage.setItem("carbonFootprint", totalFootprint);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Carbon Footprint Calculator
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label
            htmlFor="electricity"
            className="block text-sm font-medium text-gray-700"
          >
            Electricity usage (kWh/month)
          </label>
          <input
            type="number"
            id="electricity"
            required
            name="electricity"
            value={formData.electricity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., 500"
          />
        </div>
        <div>
          <label
            htmlFor="gas"
            className="block text-sm font-medium text-gray-700"
          >
            Natural gas usage (m³/month)
          </label>
          <input
            type="number"
            id="gas"
            name="gas"
            required
            value={formData.gas}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <label
            htmlFor="oil"
            className="block text-sm font-medium text-gray-700"
          >
            Oil usage (liters/month)
          </label>
          <input
            type="number"
            id="oil"
            name="oil"
            required
            value={formData.oil}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., 50"
          />
        </div>
        <div>
          <label
            htmlFor="car"
            className="block text-sm font-medium text-gray-700"
          >
            Car travel (km/month)
          </label>
          <input
            type="number"
            id="car"
            name="car"
            required
            value={formData.car}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., 1000"
          />
        </div>
        <div>
          <label
            htmlFor="flights"
            className="block text-sm font-medium text-gray-700"
          >
            Number of flights per year
          </label>
          <input
            type="number"
            id="flights"
            name="flights"
            required
            value={formData.flights}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., 2"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={calculateFootprint}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate Footprint
        </motion.button>
      </form>
      {footprint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-green-100 rounded-md"
        >
          <h3 className="text-lg font-semibold text-green-800">
            Your Carbon Footprint
          </h3>
          <p className="text-green-700">
            Your estimated carbon footprint is{" "}
            <span className="font-bold">{footprint}</span> kg CO2 per month.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CarbonFootprint;
