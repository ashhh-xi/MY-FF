"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet"; // Import leaflet types
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MapSection = () => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [source, setSource] = useState("Mumbai"); // Default source place
  const [destination, setDestination] = useState("Bangalore"); // Default destination place
  const [travelTime, setTravelTime] = useState("0 min");
  const [liveAddress, setLiveAddress] = useState(""); // Store live address
  const [map, setMap] = useState(null); // Keep track of the map instance

  const parseCoordinates = (coords) => {
    const [lat, lng] = coords
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return L.latLng(lat, lng);
  };

  const onSourceChange = (e) => setSource(e.target.value);
  const onDestinationChange = (e) => setDestination(e.target.value);

  // Function to fetch coordinates from a place name using Nominatim API
  const getCoordinatesFromPlace = async (place) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return L.latLng(lat, lon);
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  // Function to reverse geocode coordinates to an address
  const reverseGeocode = (lat, lon) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.display_name) {
          setLiveAddress(data.display_name); // Set live address
        }
      })
      .catch((error) => console.error("Error reversing geocode:", error));
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !map) {
      const leafletCSS = document.createElement("link");
      leafletCSS.rel = "stylesheet";
      leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(leafletCSS);

      const leafletScript = document.createElement("script");
      leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      leafletScript.async = true;
      leafletScript.defer = true;

      leafletScript.onload = () => {
        const L = window.L;

        // Load the Leaflet Routing Machine Plugin
        const routingScript = document.createElement("script");
        routingScript.src =
          "https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js";
        routingScript.onload = () => {
          if (L && mapRef.current && !map) {
            // Initialize the map only once
            const newMap = L.map(mapRef.current).setView([51.505, -0.09], 13);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(newMap);

            setMap(newMap); // Store the map instance

            const geoletOptions = {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            };

            const locateUser = () => {
              if (!navigator.geolocation) {
                console.warn("Geolocation is not supported by this browser.");
                return;
              }

              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;

                  const userMarker = L.marker([latitude, longitude]).addTo(
                    newMap
                  );
                  userMarker.bindPopup("You are here!").openPopup();

                  newMap.setView([latitude, longitude], 15); // Zoom to user's location
                  setGeolocationEnabled(true);

                  // Reverse geocode to get the address
                  reverseGeocode(latitude, longitude);
                },
                (error) => {
                  console.error("Geolocation error:", error);
                },
                geoletOptions
              );
            };

            const geoButton = L.control({ position: "topright" });
            geoButton.onAdd = () => {
              const btn = L.DomUtil.create(
                "button",
                "leaflet-bar leaflet-control leaflet-control-custom"
              );
              btn.innerText = "📍 Locate Me";
              btn.style.cursor = "pointer";
              btn.style.padding = "8px";
              btn.style.backgroundColor = "#000000";
              btn.style.border = "1px solid #fff";

              btn.onclick = () => locateUser();

              return btn;
            };

            geoButton.addTo(newMap);

            // Add geocoder control (Autocomplete for search)
            const geocoder = L.Control.Geocoder.nominatim();
            L.Control.geocoder({ geocoder }).addTo(newMap);
          }
        };
        document.body.appendChild(routingScript);
      };

      document.body.appendChild(leafletScript);
    }

    return () => {
      // Cleanup the map when the component unmounts
      if (map) {
        map.remove();
      }
    };
  }, [map]); // Ensure the map is initialized once

  const updateRoute = async () => {
    if (map) {
      const start = await getCoordinatesFromPlace(source);
      const end = await getCoordinatesFromPlace(destination);

      if (start && end) {
        // Add custom marker for the source
        L.marker(start, {
          icon: L.icon({
            iconUrl: "/FAK.png", // Source marker icon
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        })
          .addTo(map)
          .bindPopup(`Source: ${source}`)
          .openPopup();

        // Add custom marker for the destination
        L.marker(end, {
          icon: L.icon({
            iconUrl: "/Ramen.png", // Destination marker icon
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        })
          .addTo(map)
          .bindPopup(`Destination: ${destination}`)
          .openPopup();

        const routeControl = L.Routing.control({
          waypoints: [start, end],
          routeWhileDragging: true,
          createMarker: () => null, // Do not display default markers for the route
        }).addTo(map);

        routeControl.on("routesfound", (e) => {
          const route = e.routes[0];
          const duration = route.summary.totalTime / 60; // Convert seconds to minutes
          setTravelTime(`${Math.round(duration)} min`);
        });
      }
    }
  };

  useEffect(() => {
    updateRoute(); // Update the route whenever source or destination changes
  }, [source, destination, map]); // Recalculate route when source or destination changes

  return (
    <div>
      {/* Display live address */}
      <div style={{ marginBottom: "10px" }}>
        <FormLabel>Live Location Address: </FormLabel>
        <Input
          type="text"
          value={liveAddress}
          readOnly
          style={{ color: "black", width: "100%" }} // Black Input text
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <FormLabel>Source Place: </FormLabel>
        <Input
          type="text"
          value={source}
          onChange={onSourceChange}
          placeholder="e.g., London"
          style={{ color: "black", width: "100%" }} // Black Input text
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <FormLabel>Destination Place: </FormLabel>
        <Input
          type="text"
          value={destination}
          onChange={onDestinationChange}
          placeholder="e.g., Paris"
          style={{ color: "black", width: "100%" }} // Black Input text
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <FormLabel>Estimated Travel Time: </FormLabel>
        <Input
          type="text"
          value={travelTime}
          readOnly
          style={{ color: "black", width: "100%" }} // Black Input text
        />
      </div>

      <div id="map" ref={mapRef} style={{ height: "500px" }} />
    </div>
  );
};

export default MapSection;
