import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import {
  userIcon,
  fireIcon,
  severeStormsIcon,
  alertIcon,
} from "../../utils/Icons";

const AnimatedLoading = () => {
  const LoadingDot = ({ delay }) => (
    <motion.div
      className="w-4 h-4 rounded-full bg-primary"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
    />
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="text-center">
        <motion.div
          className="flex space-x-2 mb-4 justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingDot delay={0} />
          <LoadingDot delay={0.1} />
          <LoadingDot delay={0.2} />
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Loading Map
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Fetching your location and nearby events
        </motion.p>
        <motion.div
          className="mt-8 h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestEvent, setNearestEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        fetchNearestEvent([latitude, longitude]);
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      }
    );
  }, []);

  const fetchNearestEvent = async (location) => {
    try {
      const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events");
      const data = await response.json();
      const events = data.events.map((event) => ({
        id: event.id,
        title: event.title,
        coordinates: event.geometry[0]?.coordinates.slice(0, 2).reverse() || [],
        category: event.categories[0]?.id || "alert",
      }));
      const nearest = findNearestEvent(location, events);
      setNearestEvent(nearest);
    } catch (error) {
      setError("Error fetching NASA EONET data");
    } finally {
      setLoading(false);
    }
  };

  const findNearestEvent = (location, events) => {
    return events.reduce((nearest, event) => {
      const distance = calculateDistance(location, event.coordinates);
      return distance < calculateDistance(location, nearest.coordinates)
        ? event
        : nearest;
    });
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value) => (value * Math.PI) / 180;

  const getEventIcon = (category) => {
    switch (category) {
      case "wildfires":
        return fireIcon;
      case "severeStorms":
        return severeStormsIcon;
      default:
        return alertIcon;
    }
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.setView(userLocation, 10);
      }
    }, [userLocation, map]);
    return null;
  };

  if (loading) return <AnimatedLoading />;

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen text-red-500 bg-gray-100"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </motion.div>
    );

  if (!userLocation || !nearestEvent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full"
    >
      <MapContainer
        ref={mapRef}
        center={[0, 0]}
        zoom={2}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapUpdater />
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="rounded-lg">
              <p className="text-lg font-semibold">Your location</p>
              <p>
                Distance to nearest event:{" "}
                {calculateDistance(
                  userLocation,
                  nearestEvent.coordinates
                ).toFixed(2)}{" "}
                km
              </p>
              <p className="mt-2 font-semibold">Safety Precautions:</p>
              <ul className="list-disc list-inside">
                <li>Stay informed about the event</li>
                <li>Follow instructions from local authorities</li>
                <li>Prepare an emergency kit if necessary</li>
              </ul>
            </div>
          </Popup>
        </Marker>
        <Marker
          position={nearestEvent.coordinates}
          icon={getEventIcon(nearestEvent.category)}
        >
          <Popup>
            <div className="rounded-lg">
              <p className="text-lg font-semibold">{nearestEvent.title}</p>
              <p>
                Distance:{" "}
                {calculateDistance(
                  userLocation,
                  nearestEvent.coordinates
                ).toFixed(2)}{" "}
                km
              </p>
            </div>
          </Popup>
        </Marker>
        <Polyline
          positions={[userLocation, nearestEvent.coordinates]}
          color="red"
          weight={3}
          dashArray={[5, 5]}
        />
      </MapContainer>
    </motion.div>
  );
};

export default Map;
