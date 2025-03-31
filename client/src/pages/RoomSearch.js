import React, { useState } from "react";
import "./RoomSearch.css";

const citiesWithAreas = {
  "Houston": ["Downtown"],
  "Los Angeles": ["Hollywood"],
  "San Francisco": ["Mission"],
  "Chicago": ["Loop"],
  "Ottawa": ["ByWard Market"],
  "Vancouver": ["Gastown"],
  "Boston": ["Back Bay", "Beacon Hill"],
  "Washington DC": ["Georgetown"],
  "Seattle": ["Downtown", "Capitol Hill"],
  "Miami": ["South Beach"],
  "New York": ["Manhattan", "Bronx"],
  "Calgary": ["Downtown"],
  "Toronto": ["Downtown"],
  "Montreal": ["Old Montreal"]
};

const hotelChains = ["Hilton", "Marriott", "Holiday Inn", "Fairmont", "Four Seasons"];

export default function RoomSearch() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    capacity: "1",
    city: "",
    area: "",
    hotelChain: "",
    category: "",
    priceMin: "",
    priceMax: ""
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFilters({ ...filters, city: selectedCity, area: "" });
  };

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/search-rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const data = await res.json();
      setResults({ ...filters, totalRoomsAvailable: data.totalRoomsAvailable });
    } catch (error) {
      console.error("Search failed:", error);
      alert("Failed to fetch room availability.");
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search for Rooms</h2>
        <div className="form-grid">

          <label>
            Start Date:
            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
          </label>

          <label>
            End Date:
            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
          </label>

          <label>
            Room Capacity:
            <select name="capacity" value={filters.capacity} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>

          <label>
            City:
            <select name="city" value={filters.city} onChange={handleCityChange}>
              <option value="">Select City</option>
              {Object.keys(citiesWithAreas).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>

          <label>
            Area:
            <select name="area" value={filters.area} onChange={handleChange} disabled={!filters.city}>
              <option value="">Select Area</option>
              {filters.city && citiesWithAreas[filters.city].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </label>

          <label>
            Hotel Chain:
            <select name="hotelChain" value={filters.hotelChain} onChange={handleChange}>
              <option value="">Select Chain</option>
              {hotelChains.map(chain => (
                <option key={chain} value={chain}>{chain}</option>
              ))}
            </select>
          </label>

          <label>
            Category (Stars):
            <select name="category" value={filters.category} onChange={handleChange}>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map(star => (
                <option key={star} value={star}>{star} ⭐</option>
              ))}
            </select>
          </label>

          <label>
            Price Min:
            <input type="number" name="priceMin" value={filters.priceMin} onChange={handleChange} />
          </label>

          <label>
            Price Max:
            <input type="number" name="priceMax" value={filters.priceMax} onChange={handleChange} />
          </label>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>

        {results && (
          <div className="results-box">
            <h3>Search Summary:</h3>
            <p><strong>City:</strong> {results.city}</p>
            <p><strong>Area:</strong> {results.area}</p>
            <p><strong>Rooms Available:</strong> {results.totalRoomsAvailable}</p>
          </div>
        )}
      </div>
    </div>
  );
}
