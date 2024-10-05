import React, { useEffect, useState } from "react";
import CalamitiesVsDeaths from "../../components/private/CalamitiesVsDeaths";

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
    <>
      <CalamitiesVsDeaths />
    </>
  );
};

export default Profile;
