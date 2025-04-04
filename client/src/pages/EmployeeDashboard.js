import React, { useEffect, useState } from 'react';
import { checkInBooking, fetchAllBookings } from '../services/api';
import './EmployeeDashboard.css';

const citiesWithAreas = {
  Houston: ['Downtown', 'Midtown', 'Museum District', 'Montrose'],
  'Los Angeles': ['Hollywood', 'Downtown', 'Santa Monica', 'Beverly Hills'],
  'San Francisco': ['Mission'],
  'New York': ['Manhattan', 'Bronx'],
  Ottawa: ['ByWard Market'],
  Toronto: ['Downtown'],
  Vancouver: ['Gastown'],
  Calgary: ['Downtown'],
  Montreal: ['Old Montreal'],
  Seattle: ['Downtown', 'Capitol Hill'],
  Boston: ['Back Bay', 'Beacon Hill'],
  Miami: ['South Beach'],
  Chicago: ['Loop'],
  'Washington DC': ['Georgetown'],
};

const hotelChains = [
  'LuxuryStay',
  'BudgetInn',
  'EcoHotels',
  'UrbanRetreat',
  'SunsetLodges',
];

const EmployeeDashboard = () => {
  const [walkInData, setWalkInData] = useState({
    customerName: '',
    ssn: '',
    startDate: '',
    endDate: '',
    cardNumber: '',
    hotelChain: '',
    city: '',
    area: '',
    capacity: '1',
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchAllBookings();
        setBookings(res.bookings);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      }
    };
    loadBookings();
  }, []);

  const handleWalkInChange = (e) => {
    const { name, value } = e.target;
    setWalkInData({ ...walkInData, [name]: value });
  };

  const handleWalkInCityChange = (e) => {
    const city = e.target.value;
    setWalkInData({ ...walkInData, city, area: '' });
  };

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    alert(
      `Trying to rent a room for ${walkInData.customerName} in ${walkInData.hotelChain}, ${walkInData.city} - ${walkInData.area}`
    );
  };

  return (
    <div className="dashboard-container">
      <h2>📋 Customer Bookings</h2>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.booking_id} className="booking-item">
            <div className="booking-details">
              <p><strong>Booking ID:</strong> {booking.booking_id}</p>
              <p><strong>Customer ID:</strong> {booking.customer_id}</p>
              <p><strong>Customer Name:</strong> {booking.customer_name}</p>
              <p><strong>Hotel ID:</strong> {booking.hotel_id}</p>
              <p><strong>Room Number:</strong> {booking.room_number}</p>
              <p><strong>Start Date:</strong> {new Date(booking.start_date).toISOString().split('T')[0]}</p>
              <p><strong>End Date:</strong> {new Date(booking.end_date).toISOString().split('T')[0]}</p>
            </div>
            <button onClick={async () => {
              try {
                const response = await checkInBooking(booking.booking_id);
                alert(response.message);
              } catch (err) {
                console.error('Check-in failed:', err);
                alert('Check-in failed');
              }
            }}>Check In</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>🆕 Rent Room Directly (Walk-in)</h2>
      <form className="walk-in-form" onSubmit={handleWalkInSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={walkInData.customerName}
          onChange={handleWalkInChange}
          required
        />

        <input
          type="text"
          name="ssn"
          placeholder="SSN"
          value={walkInData.ssn}
          onChange={handleWalkInChange}
          required
        />

        <select
          name="hotelChain"
          value={walkInData.hotelChain}
          onChange={handleWalkInChange}
          required
        >
          <option value="">Select Hotel Chain</option>
          {hotelChains.map((chain) => (
            <option value={chain} key={chain}>
              {chain}
            </option>
          ))}
        </select>

        <select
          name="city"
          value={walkInData.city}
          onChange={handleWalkInCityChange}
          required
        >
          <option value="">Select City</option>
          {Object.keys(citiesWithAreas).map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          name="area"
          value={walkInData.area}
          onChange={handleWalkInChange}
          disabled={!walkInData.city}
          required
        >
          <option value="">Select Area</option>
          {walkInData.city &&
            citiesWithAreas[walkInData.city].map((area) => (
              <option value={area} key={area}>
                {area}
              </option>
            ))}
        </select>

        <select
          name="capacity"
          value={walkInData.capacity}
          onChange={handleWalkInChange}
          required
        >
          {[1, 2, 3, 4, 5].map((cap) => (
            <option value={cap} key={cap}>
              {cap} people
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={walkInData.startDate}
          onChange={handleWalkInChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={walkInData.endDate}
          onChange={handleWalkInChange}
          required
        />

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={walkInData.cardNumber}
          onChange={handleWalkInChange}
          required
        />

        <button type="submit">Rent Room</button>
      </form>
    </div>
  );
};

export default EmployeeDashboard;
