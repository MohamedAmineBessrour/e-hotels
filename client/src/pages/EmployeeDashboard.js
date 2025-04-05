import React, { useEffect, useState } from 'react';
import { checkInBooking, fetchAllBookings, registerWalkInCustomer, rentRoom } from '../services/api';
import './EmployeeDashboard.css';


const EmployeeDashboard = () => {
  const [walkInData, setWalkInData] = useState({
    customerName: '',
    customerAddress: '',
    ssn: '',
    dob: '',
    startDate: '',
    endDate: '',
    cardNumber: '',
    hotelId: '',
    roomNumber: '',
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

  const handleWalkInSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name: walkInData.customerName,
      address: walkInData.customerAddress,
      ssn: walkInData.ssn,
      dob: walkInData.dob,
      card_number: walkInData.cardNumber,
      registration_date: walkInData.startDate
    };

    try {
      // Register the customer
      const customerRes = await registerWalkInCustomer(customerData);
      const customer = customerRes.data;

      // Insert renting
      const rentingData = {
        customerId: customer.customer_id,
        hotelId: parseInt(walkInData.hotelId),
        roomNumber: parseInt(walkInData.roomNumber),
        startDate: walkInData.startDate,
        endDate: walkInData.endDate
      };      

      const rentingRes = await rentRoom(rentingData);

      alert(`✅ Customer ${customer.name} successfully rented room ${rentingRes.renting.room_number} at hotel ${rentingRes.renting.hotel_id}`);
    } catch (err) {
      alert(`❌ Renting process failed: ${err?.response?.data?.error || err.message || 'Unknown error'}`);
      alert('❌ Failed to rent room. Please check the info or room availability.');
    }
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
        <h3>👤 Customer Info</h3>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={walkInData.customerName}
          onChange={handleWalkInChange}
          required
          minLength={2}
          maxLength={50}
        />

        <input
          type="text"
          name="customerAddress"
          placeholder="Customer Address"
          value={walkInData.customerAddress}
          onChange={handleWalkInChange}
          required
          minLength={5}
          maxLength={100}
        />

        <input
          type="text"
          name="ssn"
          placeholder="SSN"
          value={walkInData.ssn}
          onChange={handleWalkInChange}
          required
          pattern="^[0-9]{9,20}$"
          title="SSN must be 9 to 20 digits"
        />

        <input
          type="date"
          name="dob"
          value={walkInData.dob}
          onChange={handleWalkInChange}
          required
          max={new Date().toISOString().split('T')[0]}
        />

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={walkInData.cardNumber}
          onChange={handleWalkInChange}
          required
          pattern="^[0-9]{16}$"
          title="Card number must be 16 digits"
        />
        <h3>🏨 Hotel Info</h3>

        <input
          type="number"
          name="hotelId"
          placeholder="Hotel ID"
          value={walkInData.hotelId}
          onChange={handleWalkInChange}
          required
          min={1}
        />

        <input
          type="number"
          name="roomNumber"
          placeholder="Room Number"
          value={walkInData.roomNumber}
          onChange={handleWalkInChange}
          required
          min={1}
        />

        <input
          type="date"
          name="startDate"
          value={walkInData.startDate}
          onChange={handleWalkInChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />

        <input
          type="date"
          name="endDate"
          value={walkInData.endDate}
          onChange={handleWalkInChange}
          required
          min={walkInData.startDate || new Date().toISOString().split('T')[0]}
        />
        

        <button type="submit">Rent Room</button>
      </form>
    </div>
  );
};

export default EmployeeDashboard;
