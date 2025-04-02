import React, { useEffect, useState } from "react";
import "./HotelViewsPage.css";

const cityAreaMap = {
  Houston: ["Downtown", "Midtown", "Museum District", "Montrose"],
  "Los Angeles": ["Hollywood", "Downtown", "Santa Monica", "Beverly Hills"],
  "San Francisco": ["Mission"],
  "New York": ["Manhattan", "Bronx"],
  Ottawa: ["ByWard Market"],
  Vancouver: ["Gastown"],
  Calgary: ["Downtown"],
  Montreal: ["Old Montreal"],
  Seattle: ["Downtown", "Capitol Hill"],
  Boston: ["Back Bay", "Beacon Hill"],
  Miami: ["South Beach"],
  Chicago: ["Loop"],
  "Washington DC": ["Georgetown"],
};

const HotelViewsPage = () => {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [areasList, setAreasList] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [hotels, setHotels] = useState([]);


  useEffect(() => {
    if (city) {
      setAreasList(cityAreaMap[city] || []);
      setArea("");
    }
  }, [city]);

  const handleSearch = async () => {
    if (!city || !area) {
      alert("Please select both city and area.");
      return;
    }

    const encodedCity = encodeURIComponent(city);
    const encodedArea = encodeURIComponent(area);
    const fullArea = `${area}, ${city}`;

    try {
      console.log("🔍 Fetching Available Rooms with:", { city, area });

      const res1 = await fetch(`http://localhost:5000/api/views/available-rooms?city=${encodedCity}&area=${encodedArea}`);
      const availableData = await res1.json();
      console.log("✅ Available Rooms Response:", availableData);

      if (!availableData || availableData.available_rooms === null) {
        alert(`No available rooms found for ${fullArea}`);
      } else {
        setAvailableRooms(availableData);
      }      

      console.log("🔍 Fetching Hotel Capacity with:", fullArea);
      const res2 = await fetch(`http://localhost:5000/api/views/hotel-capacity?area=${encodeURIComponent(fullArea)}`);
      const capacityData = await res2.json();
      console.log("✅ Hotel Capacity Response:", capacityData);

      if (!capacityData.length) {
        alert(`No hotels found in ${fullArea}`);
      } else {
        setHotels(capacityData);
      }

    } catch (error) {
      console.log(error.message);
      alert("Something went wrong. Check the browser console. Error: " + error.message);
    }    
  };

  return (
    <div className="hotel-views-page">
      <h2>Search Available Rooms and Hotel Capacity</h2>
      <div className="search-form">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          {Object.keys(cityAreaMap).map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)} disabled={!city}>
          <option value="">Select Area</option>
          {areasList.map((a, i) => (
            <option key={i} value={a}>{a}</option>
          ))}
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {availableRooms && (
        <div className="result-box">
          <h3>Available Rooms in {area}, {city}:</h3>
          <p>{availableRooms.available_rooms} rooms available</p>
        </div>
      )}

      {hotels.length > 0 && (
        <div className="hotel-list">
          <h3>Hotels in {area}, {city}</h3>
          <ul>
            {hotels.map((h, i) => (
              <li key={i}>
                Hotel #{h.hotel_id}: {h.total_capacity} total capacity
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelViewsPage;