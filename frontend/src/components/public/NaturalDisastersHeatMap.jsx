import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const NaturalDisastersHeatMap = () => {
  const data = [
    {
      location: [34.0522, -118.2437],
      disasters: 50,
      region: "Los Angeles, CA",
    },
    { location: [40.7128, -74.006], disasters: 30, region: "New York, NY" },
    {
      location: [37.7749, -122.4194],
      disasters: 70,
      region: "San Francisco, CA",
    },
    { location: [28.5383, -81.3792], disasters: 40, region: "Orlando, FL" },
    { location: [51.5074, -0.1278], disasters: 20, region: "London, UK" },
    { location: [19.076, 72.8777], disasters: 60, region: "Mumbai, India" },
    { location: [35.6895, 139.6917], disasters: 80, region: "Tokyo, Japan" },
    { location: [48.8566, 2.3522], disasters: 25, region: "Paris, France" },
    { location: [55.7558, 37.6173], disasters: 45, region: "Moscow, Russia" },
    {
      location: [-33.8688, 151.2093],
      disasters: 30,
      region: "Sydney, Australia",
    },
    { location: [40.4168, -3.7038], disasters: 15, region: "Madrid, Spain" },
    {
      location: [-34.6037, -58.3816],
      disasters: 35,
      region: "Buenos Aires, Argentina",
    },
    {
      location: [-23.5505, -46.6333],
      disasters: 50,
      region: "São Paulo, Brazil",
    },
    { location: [6.5244, 3.3792], disasters: 40, region: "Lagos, Nigeria" },
    { location: [31.2304, 121.4737], disasters: 70, region: "Shanghai, China" },
    { location: [30.0444, 31.2357], disasters: 20, region: "Cairo, Egypt" },
    { location: [39.9042, 116.4074], disasters: 60, region: "Beijing, China" },
    { location: [41.9028, 12.4964], disasters: 25, region: "Rome, Italy" },
    {
      location: [13.7563, 100.5018],
      disasters: 40,
      region: "Bangkok, Thailand",
    },
    { location: [-1.2921, 36.8219], disasters: 15, region: "Nairobi, Kenya" },
  ];

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <MapContainer
        center={[34.0522, -118.2437]}
        zoom={2}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((point, index) => (
          <Circle
            key={index}
            center={point.location}
            radius={point.disasters * 10000}
            fillColor="red"
            color="red"
            fillOpacity={0.5}
            stroke={false}
          >
            <Popup>
              <div className="p-2">
                <strong>{point.region}</strong>
                <br />
                Disasters: {point.disasters}
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default NaturalDisastersHeatMap;
