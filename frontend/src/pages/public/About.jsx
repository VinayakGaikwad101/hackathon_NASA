import React from "react";
import NaturalDisastersHeatMap from "../../components/public/NaturalDisastersHeatMap";

const About = () => {
  return (
    <div className="flex-grow p-4">
      <div className="text-center text-2xl font-bold mb-4">
        Heatmap indicating amount of disasters within a given region
      </div>
      <div className="block text-sm font-medium text-black-700 p-4">
        <NaturalDisastersHeatMap />
      </div>
    </div>
  );
};

export default About;
