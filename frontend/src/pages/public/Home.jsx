import React from "react";
import NaturalDisastersOverTime from "../../components/public/NaturalDisastersOverTime";
import ClimateChangeDisasters from "../../components/public/ClimateChangeDisasters";
import EconomicImpactChart from "../../components/public/EconomicImpact";
import ResponseTimesChart from "../../components/public/ResponseTimes";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-around">
      <div className="w-full md:w-1/2 p-2">
        <NaturalDisastersOverTime />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <ClimateChangeDisasters />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <EconomicImpactChart />
      </div>
      <div className="w-full md:w-1/2 p-2">
        <ResponseTimesChart />
      </div>
    </div>
  );
};

export default Home;
