import React, { useState } from 'react';
import './EmployeeDashboard.css';

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

const EmployeeDashboard = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const bookings = [
    {
      Booking_ID: 1,
      Customer_ID: 101,
      Customer_Name: 'Alice',
      Hotel_ID: 1,
      Room_Number: 101,
      Start_Date: '2025-04-10',
      End_Date: '2025-04-12',
    },
    {
      Booking_ID: 2,
      Customer_ID: 102,
      Customer_Name: 'Bob',
      Hotel_ID: 2,
      Room_Number: 202,
      Start_Date: '2025-04-15',
      End_Date: '2025-04-18',
    },
  ];

  const handleCheckInClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleSubmitCard = () => {
    alert(`Checking in Customer ${selectedBooking.Customer_ID} with card ${cardNumber}`);
    setShowModal(false);
    setCardNumber('');
  };

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
    alert(`Trying to rent a room for ${walkInData.customerName} in ${walkInData.hotelChain}, ${walkInData.city} - ${walkInData.area}`);
  };

  return React.createElement('div', { className: 'dashboard-container' },
    React.createElement('h2', null, '📋 Customer Bookings'),
    React.createElement('ul', { className: 'booking-list' },
      bookings.map((booking) =>
        React.createElement('li', { key: booking.Booking_ID, className: 'booking-item' },
          React.createElement('p', null,
            `Customer: ${booking.Customer_Name} | Room: ${booking.Room_Number} | Dates: ${booking.Start_Date} to ${booking.End_Date}`
          ),
          React.createElement('button', { onClick: () => handleCheckInClick(booking) }, 'Check In')
        )
      )
    ),
    showModal && React.createElement('div', { className: 'modal' },
      React.createElement('h3', null, 'Enter Card Number for Check-in'),
      React.createElement('input', {
        type: 'text',
        placeholder: 'Enter card number',
        value: cardNumber,
        onChange: (e) => setCardNumber(e.target.value)
      }),
      React.createElement('button', { onClick: handleSubmitCard }, 'Submit')
    ),
    React.createElement('hr', null),
    React.createElement('h2', null, '🆕 Rent Room Directly (Walk-in)'),
    React.createElement('form', { className: 'walk-in-form', onSubmit: handleWalkInSubmit },
      React.createElement('input', {
        type: 'text',
        name: 'customerName',
        placeholder: 'Customer Name',
        value: walkInData.customerName,
        onChange: handleWalkInChange
      }),
      React.createElement('input', {
        type: 'text',
        name: 'ssn',
        placeholder: 'SSN',
        value: walkInData.ssn,
        onChange: handleWalkInChange
      }),
      React.createElement('select', {
        name: 'hotelChain',
        value: walkInData.hotelChain,
        onChange: handleWalkInChange
      },
        [React.createElement('option', { value: '', key: '' }, 'Select Hotel Chain')].concat(
          hotelChains.map(chain =>
            React.createElement('option', { value: chain, key: chain }, chain)
          )
        )
      ),
      React.createElement('select', {
        name: 'city',
        value: walkInData.city,
        onChange: handleWalkInCityChange
      },
        [React.createElement('option', { value: '', key: '' }, 'Select City')].concat(
          Object.keys(citiesWithAreas).map(city =>
            React.createElement('option', { value: city, key: city }, city)
          )
        )
      ),
      React.createElement('select', {
        name: 'area',
        value: walkInData.area,
        onChange: handleWalkInChange,
        disabled: !walkInData.city
      },
        [React.createElement('option', { value: '', key: '' }, 'Select Area')].concat(
          walkInData.city ? citiesWithAreas[walkInData.city].map(area =>
            React.createElement('option', { value: area, key: area }, area)
          ) : []
        )
      ),
      React.createElement('select', {
        name: 'capacity',
        value: walkInData.capacity,
        onChange: handleWalkInChange
      },
        [1, 2, 3, 4, 5].map(cap =>
          React.createElement('option', { value: cap, key: cap }, `${cap} people`)
        )
      ),
      React.createElement('input', {
        type: 'date',
        name: 'startDate',
        value: walkInData.startDate,
        onChange: handleWalkInChange
      }),
      React.createElement('input', {
        type: 'date',
        name: 'endDate',
        value: walkInData.endDate,
        onChange: handleWalkInChange
      }),
      React.createElement('input', {
        type: 'text',
        name: 'cardNumber',
        placeholder: 'Card Number',
        value: walkInData.cardNumber,
        onChange: handleWalkInChange
      }),
      React.createElement('button', { type: 'submit' }, 'Rent Room')
    )
  );
};

export default EmployeeDashboard;
