import React, { useState } from 'react';
import './ManagePage.css';

const hotelChains = [
  { id: 1, name: 'LuxuryStay' },
  { id: 2, name: 'BudgetInn' },
  { id: 3, name: 'EcoHotels' },
  { id: 4, name: 'UrbanRetreat' },
  { id: 5, name: 'SunsetLodges' }
];

const ManagePage = () => {
  const [hotelData, setHotelData] = useState({
    hotelId: '',
    hotelChainId: '',
    address: '',
    starRating: '',
  });

  const [hotelToDelete, setHotelToDelete] = useState('');

  const [roomData, setRoomData] = useState({
    hotelId: '',
    roomNumber: '',
    capacity: '',
    price: '',
    viewType: '',
    availability: true,
    isExtendable: false,
  });

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleRoomChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData({ ...roomData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleInsertHotel = (e) => {
    e.preventDefault();
    alert(`Insert hotel: ${JSON.stringify(hotelData)}`);
  };

  const handleDeleteHotel = (e) => {
    e.preventDefault();
    alert(`Delete hotel with ID: ${hotelToDelete}`);
  };

  const handleInsertRoom = (e) => {
    e.preventDefault();
    alert(`Insert room: ${JSON.stringify(roomData)}`);
  };

  const handleDeleteRoom = (e) => {
    e.preventDefault();
    alert(`Delete Room ${roomData.roomNumber} from Hotel ${roomData.hotelId}`);
  };

  return (
    <div className="manage-container">
      <h2>🏨 Manage Hotels</h2>
      <form className="form-group" onSubmit={handleInsertHotel}>
        <input type="number" name="hotelId" placeholder="Hotel ID" value={hotelData.hotelId} onChange={handleHotelChange} required />
        <select
          name="hotelChainId"
          value={hotelData.hotelChainId}
          onChange={handleHotelChange}
          required
        >
          <option value="">Select Hotel Chain</option>
          {hotelChains.map((chain) => (
            <option key={chain.id} value={chain.id}>{chain.name}</option>
          ))}
        </select>
        <input type="text" name="address" placeholder="Hotel Address" value={hotelData.address} onChange={handleHotelChange} required />
        <input type="number" name="starRating" placeholder="Star Rating (1-5)" value={hotelData.starRating} onChange={handleHotelChange} required />
        <button type="submit">Insert Hotel</button>
      </form>

      <form className="form-group" onSubmit={handleDeleteHotel}>
        <input
          type="number"
          name="hotelToDelete"
          placeholder="Hotel ID to Delete"
          value={hotelToDelete}
          onChange={(e) => setHotelToDelete(e.target.value)}
          required
        />
        <button type="submit" className="delete-btn">Delete Hotel</button>
      </form>

      <hr />

      <h2>🛏️ Manage Rooms</h2>
      <form className="form-group" onSubmit={handleInsertRoom}>
        <input type="number" name="hotelId" placeholder="Hotel ID" value={roomData.hotelId} onChange={handleRoomChange} required />
        <input type="number" name="roomNumber" placeholder="Room Number" value={roomData.roomNumber} onChange={handleRoomChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={roomData.capacity} onChange={handleRoomChange} required />
        <input type="number" name="price" placeholder="Price" value={roomData.price} onChange={handleRoomChange} required />
        <input type="text" name="viewType" placeholder="View Type (e.g. Sea View)" value={roomData.viewType} onChange={handleRoomChange} />
        <label>
          <input type="checkbox" name="availability" checked={roomData.availability} onChange={handleRoomChange} /> Available
        </label>
        <label>
          <input type="checkbox" name="isExtendable" checked={roomData.isExtendable} onChange={handleRoomChange} /> Extendable
        </label>
        <button type="submit">Insert Room</button>
        <button onClick={handleDeleteRoom} className="delete-btn">Delete Room</button>
      </form>
    </div>
  );
};

export default ManagePage;
