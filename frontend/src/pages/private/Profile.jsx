import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userIPAddress, setUserIPAddress] = useState("");
  const [realTimeLocation, setRealTimeLocation] = useState({});

  const fetchUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setUserIPAddress(data.ip);
      console.log("User IP fetched successfully");
    } catch (error) {
      console.log("Failed to fetch user IP:", error.message);
    }
  };

  useEffect(() => {
    fetchUserIP();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setRealTimeLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          console.log("Real-time location updated");
        },
        (error) => {
          console.log("Error watching position:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center text-xl font-bold">
        <div>Your IP Address: {userIPAddress}</div>
        {realTimeLocation.lat && (
          <div>
            Real-time Latitude: {realTimeLocation.lat}, Real-time Longitude:{" "}
            {realTimeLocation.lon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
