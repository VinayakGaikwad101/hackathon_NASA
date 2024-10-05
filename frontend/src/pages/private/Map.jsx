import React, { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import {
  userIcon,
  fireIcon,
  severeStormsIcon,
  alertIcon,
} from "../../utils/Icons";
import "./Map.css";

const Map = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const eventMarkerRef = useRef(null);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [nasaEvents, setNasaEvents] = useState([]);
  const nasaAPI = "https://eonet.gsfc.nasa.gov/api/v3/events";
  const lineRef = useRef(null);

  const fetchNASAOENETData = async () => {
    try {
      const response = await fetch(nasaAPI);
      if (!response.ok) {
        throw new Error(`Error fetching EONET data: ${response.statusText}`);
      }
      const data = await response.json();
      const eventData = data.events.map((event) => ({
        id: event.id,
        title: event.title,
        coordinates: event.geometry[0]?.coordinates || [],
        category: event.categories[0]?.id || "alert",
      }));
      setNasaEvents(eventData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
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

  const findClosestEvent = () => {
    if (nasaEvents.length === 0) return null;
    let closestEvent = nasaEvents[0];
    let closestDistance = calculateDistance(
      userLatitude,
      userLongitude,
      closestEvent.coordinates[1],
      closestEvent.coordinates[0]
    );
    nasaEvents.forEach((event) => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        event.coordinates[1],
        event.coordinates[0]
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestEvent = event;
      }
    });
    return closestEvent;
  };

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

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map("map").setView([0, 0], 2);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }
    fetchNASAOENETData();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLatitude(latitude);
          setUserLongitude(longitude);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.log("Error watching position:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    if (!userMarkerRef.current) {
      userMarkerRef.current = leaflet
        .marker([userLatitude, userLongitude], {
          icon: userIcon,
          riseOnHover: true,
        })
        .addTo(mapRef.current)
        .bindPopup(getUserPopupContent);
    } else {
      userMarkerRef.current.setLatLng([userLatitude, userLongitude]);
    }
  }, [userLatitude, userLongitude, nasaEvents]);

  useEffect(() => {
    if (nasaEvents.length > 0) {
      const closestEvent = findClosestEvent();
      if (closestEvent) {
        const eventIcon = getEventIcon(closestEvent.category);
        if (!eventMarkerRef.current) {
          eventMarkerRef.current = leaflet
            .marker(closestEvent.coordinates, {
              icon: eventIcon,
              riseOnHover: true,
            })
            .addTo(mapRef.current)
            .bindPopup(getEventPopupContent(closestEvent));
        } else {
          eventMarkerRef.current.setLatLng(closestEvent.coordinates);
          eventMarkerRef.current.setIcon(eventIcon);
          eventMarkerRef.current.setPopupContent(
            getEventPopupContent(closestEvent)
          );
        }
      }
    }
  }, [nasaEvents, userLatitude, userLongitude]);

  useEffect(() => {
    const updateMarkersOnZoom = () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLatitude, userLongitude]);
      }
      if (eventMarkerRef.current) {
        const closestEvent = findClosestEvent();
        if (closestEvent) {
          eventMarkerRef.current.setLatLng(closestEvent.coordinates);
        }
      }
    };
    mapRef.current.on("zoomend", updateMarkersOnZoom);
    return () => {
      mapRef.current.off("zoomend", updateMarkersOnZoom);
    };
  }, [userLatitude, userLongitude, nasaEvents]);

  const getUserPopupContent = () => {
    const closestEvent = findClosestEvent();
    if (!closestEvent)
      return `<div class="rounded-lg"> <p class="text-lg font-semibold">Your location!</p> </div>`;

    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      closestEvent.coordinates[1],
      closestEvent.coordinates[0]
    );
    const distanceInKm = distance * 1.60934; // Convert meters to kilometers

    let safetyContent = "";
    switch (closestEvent.category) {
      case "wildfires":
        safetyContent = `
          <p>Wildfire safety tips:
            <ul>
              <li>Follow evacuation orders immediately.</li>
              <li>Cover your nose and mouth with a damp cloth.</li>
              <li>Create a fire break around your property if time allows.</li>
            </ul>
          </p>
        `;
        break;
      case "severeStorms":
        safetyContent = `
          <p>Severe storm safety tips:
            <ul>
              <li>Seek shelter indoors, away from windows.</li>
              <li>Do not drive through flooded areas.</li>
              <li>Beware of downed power lines and lightning.</li>
            </ul>
          </p>
        `;
        break;
    }

    return `
      <div class="rounded-lg">
        <p class="text-lg font-semibold">${safetyContent}</p>
        <p>${safetyContent}</p>
        <p>Distance to nearest ${closestEvent.category}: ${distanceInKm.toFixed(
      2
    )} km</p>
      </div>
    `;
  };

  const getEventPopupContent = (event) => {
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      event.coordinates[1],
      event.coordinates[0]
    );
    const distanceInKm = distance * 1.60934; // Convert meters to kilometers

    return `
      <div class="rounded-lg">
        <p class="text-lg font-semibold">${event.title}</p>
        <p>Distance: ${distanceInKm.toFixed(2)} km</p>
      </div>
    `;
  };

  useEffect(() => {
    if (userMarkerRef.current && eventMarkerRef.current) {
      const userLatLng = userMarkerRef.current.getLatLng();
      const eventLatLng = eventMarkerRef.current.getLatLng();

      if (!lineRef.current) {
        lineRef.current = L.polyline([userLatLng, eventLatLng], {
          color: "red",
          weight: 3,
          dashArray: [5, 5], // Optional: Add a dashed line style
        }).addTo(mapRef.current);
      } else {
        lineRef.current.setLatLngs([userLatLng, eventLatLng]);
      }
    }
  }, [userMarkerRef, eventMarkerRef]);

  return (
    <div id="map" className="w-full h-full" style={{ height: "100vh" }}></div>
  );
};

export default Map;
