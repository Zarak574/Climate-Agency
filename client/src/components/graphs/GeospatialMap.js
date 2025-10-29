import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeospatialMap = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState([]);
  const [metric, setMetric] = useState("avg_temp");

  // Fetch regions for dropdown
  useEffect(() => {
    fetch("http://localhost:8000/regions_list")
      .then((res) => res.json())
      .then((resData) => {
        if (Array.isArray(resData)) setRegions(resData);
        else console.error("Invalid region data:", resData);
      })
      .catch((err) => console.error("Failed to fetch regions:", err));
  }, []);

  // Fetch geospatial data for selected region
  useEffect(() => {
    const query = region ? `?region=${encodeURIComponent(region)}` : "";
    fetch(`http://localhost:8000/geospatial_insights${query}`)
      .then((res) => res.json())
      .then((resData) => {
        if (Array.isArray(resData)) setData(resData);
        else {
          console.error("Invalid station data:", resData);
          setData([]); // prevent map crash
        }
      })
      .catch((err) => {
        console.error("Failed to fetch station data:", err);
        setData([]);
      });
  }, [region]);

  const getColor = (value) => {
    if (metric === "avg_temp") return value > 30 ? "red" : value > 20 ? "orange" : "blue";
    if (metric === "avg_rainfall") return value > 200 ? "navy" : value > 100 ? "skyblue" : "lightblue";
    if (metric === "avg_co2") return value > 450 ? "darkgreen" : value > 400 ? "green" : "lightgreen";
    return "gray";
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="p-2 border rounded">
          {/* <option value="">All Regions</option> */}
          {regions.map((r, i) => (
            <option key={i} value={r}>{r}</option>
          ))}
        </select>

        <select value={metric} onChange={(e) => setMetric(e.target.value)} className="p-2 border rounded">
          {/* <option value="avg_temp">Temperature</option>
          <option value="avg_rainfall">Rainfall</option>
          <option value="avg_co2">CO2</option> */}
        </select>
      </div>

      {/* Map */}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Array.isArray(data) && data.map((station, idx) => (
          <CircleMarker
            key={idx}
            center={[station.Latitude, station.Longitude]}
            radius={8}
            fillColor={getColor(station[metric])}
            fillOpacity={0.8}
            stroke={false}
          >
            <Popup>
              <strong>{station.Station}</strong><br />
              Region: {station.Region}<br />
              Temp: {station.avg_temp?.toFixed(1)}°C<br />
              Rain: {station.avg_rainfall?.toFixed(1)} mm<br />
              CO2: {station.avg_co2?.toFixed(1)} ppm
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeospatialMap;
