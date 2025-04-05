import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { bookRoom, fetchAvailableRooms } from '../services/api';
import './RoomSearch.css';

const citiesWithAreas = {
  Houston: ["Downtown", "Midtown", "Museum District", "Montrose"],
  "Los Angeles": ["Hollywood", "Downtown", "Santa Monica", "Beverly Hills"],
  "San Francisco": ['Mission', 'SoMa', 'Chinatown', 'Nob Hill'],
  "New York": ['Manhattan', 'Brooklyn', 'Queens', 'Bronx'],
  Ottawa: ['ByWard Market', 'Centretown', 'Glebe', 'Kanata'],
  Toronto: ['Downtown', 'North York', 'Scarborough', 'Etobicoke'],
  Vancouver: ['Gastown', 'Downtown', 'Kitsilano', 'Richmond'],
  Calgary: ['Downtown', 'Beltline', 'Bridgeland', 'Inglewood'],
  Montreal: ['Old Montreal', 'Plateau', 'Downtown', 'Griffintown'],
  Seattle: ['Downtown', 'Capitol Hill', 'Ballard', 'Fremont'],
  Boston: ['Back Bay', 'Beacon Hill', 'Cambridge', 'Charlestown'],
  Miami: ['South Beach', 'Downtown', 'Wynwood', 'Brickell'],
  Chicago: ['Loop', 'River North', 'Lincoln Park', 'Hyde Park'],
  "Washington DC": ['Georgetown', 'Dupont Circle', 'Capitol Hill', 'Adams Morgan'],
};

const hotelChains = [
  'LuxuryStay',
  'BudgetInn',
  'EcoHotels',
  'UrbanRetreat',
  'SunsetLodges',
];

export default function RoomSearch() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    capacity: '1',
    city: '',
    area: '',
    hotelChain: '',
    category: '',
    priceMin: '',
    priceMax: '',
  });

  const [results, setResults] = useState(null);

  const { user } = useAuth();

const handleBooking = async (room) => {
  if (!user || user.role !== 'customer') {
    alert('You must be logged in as a customer to book a room.');
    return;
  }

  const bookingData = {
    customerId: user.customer_id,
    hotelId: room.hotel_id,
    roomNumber: room.room_number,
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  try {
    const res = await bookRoom(bookingData);
    alert(`✅ Room booked! Booking ID: ${res.data.booking.booking_id}`);
  } catch (error) {
    console.error('Booking failed:', error);
    alert('❌ Could not book room. Check availability or date.');
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFilters({ ...filters, city: selectedCity, area: '' });
  };

  const handleSearch = async () => {
    const { startDate, endDate, capacity, city, area, hotelChain } = filters;
  
    // Validate required fields
    if (!startDate || !endDate || !capacity || !city || !area || !hotelChain) {
      alert('Please fill in all required fields: start date, end date, capacity, city, area, and the hotel chain.');
      return;
    }
  
    if (new Date(startDate) > new Date(endDate)) {
      alert('End date must be after start date.');
      return;
    }
  
    try {
      // Merge area + city in correct order
      const mergedAddress = [area, city]
        .filter(Boolean)
        .join(', ');
  
      const adjustedFilters = {
        startDate,
        endDate,
        capacity,
        area: mergedAddress,
        hotelChain: filters.hotelChain,
        category: filters.category,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
      };
  
      const res = await fetchAvailableRooms(adjustedFilters);
  
      setResults({
        ...filters,
        totalRoomsAvailable: res.data.totalRoomsAvailable,
        rooms: res.data.rooms,
      });
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to fetch room availability.');
    }
  };  

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search for Rooms</h2>
        <div className="form-grid">

          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Room Capacity:
            <select
              name="capacity"
              value={filters.capacity}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <label>
            City:
            <select
              name="city"
              value={filters.city}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {Object.keys(citiesWithAreas).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label>
            Area:
            <select
              name="area"
              value={filters.area}
              onChange={handleChange}
              disabled={!filters.city}
            >
              <option value="">Select Area</option>
              {filters.city &&
                citiesWithAreas[filters.city].map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Hotel Chain:
            <select
              name="hotelChain"
              value={filters.hotelChain}
              onChange={handleChange}
            >
              <option value="">Select Chain</option>
              {hotelChains.map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>
          </label>

          <label>
            Category (Stars):
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </label>

          <label>
            Price Min:
            <input
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleChange}
            />
          </label>

          <label>
            Price Max:
            <input
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>

        {results && (
          <div className="results-box">
            <h3>Search Summary:</h3>
            <p>
              <strong>City:</strong> {results.city}
            </p>
            <p>
              <strong>Area:</strong> {results.area}
            </p>
            <p>
              <strong>Rooms Available:</strong> {results.totalRoomsAvailable}
            </p>
          </div>
        )}
        {results?.rooms?.length > 0 && (
          <div className="room-results">
            <h3>Available Rooms:</h3>
            <div className="room-grid">
              {results.rooms.map((room, index) => (
                <div key={index} className="room-card">
                  <div className="room-header">
                    <h4>Room #{room.room_number}</h4>
                    <span className="stars">
                      {'⭐'.repeat(room.star_rating)}
                    </span>
                  </div>
                  <p><strong>Hotel Chain:</strong> {room.hotel_chain_name}</p>
                  <p><strong>Address:</strong> {room.address}</p>
                  <p><strong>Capacity:</strong> {room.capacity}</p>
                  <p><strong>Price:</strong> ${parseFloat(room.price).toFixed(2)}</p>
                  <p><strong>View:</strong> {room.view_type}</p>
                  <p><strong>Extendable:</strong> {room.is_extendable ? 'Yes' : 'No'}</p>
                  <p><strong>Available:</strong> {room.availability ? 'Yes' : 'No'}</p>
                  <button
                    className="book-button"
                    onClick={() => handleBooking(room)}
                  >
                    Book Room
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}  
      </div>
    </div>
  );
}
