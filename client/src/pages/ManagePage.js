import React, { useState } from 'react';
import axios from 'axios';
import './ManagePage.css';

const ManagePage = () => {
  const [hotelIdToUpdate, setHotelIdToUpdate] = useState('');
  const [hotelInfo, setHotelInfo] = useState({
    starRating: '',
    phone: '',
    email: ''
  });

  const [insertRoomData, setInsertRoomData] = useState({
    hotelId: '',
    roomNumber: '',
    capacity: '',
    price: '',
    viewType: '',
    availability: true,
    isExtendable: false,
  });

  const [roomSearch, setRoomSearch] = useState({ hotelId: '', roomNumber: '' });
  const [roomUpdateInfo, setRoomUpdateInfo] = useState(null);

  const handleInsertRoomChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInsertRoomData({ ...insertRoomData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleRoomSearchChange = (e) => {
    const { name, value } = e.target;
    setRoomSearch({ ...roomSearch, [name]: value });
  };

  const handleRoomUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomUpdateInfo({ ...roomUpdateInfo, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFindHotel = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5001/api/manage/hotel/${hotelIdToUpdate}`);
      setHotelInfo(res.data);
    } catch (err) {
      alert("❌ Hotel not found.");
      console.error("Error fetching hotel:", err.message);
    }
  };

  const handleHotelInfoChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateHotel = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/manage/hotel/${hotelIdToUpdate}`, {
        starRating: hotelInfo.starRating ? Number(hotelInfo.starRating) : null,
        phone: hotelInfo.phone || null,
        email: hotelInfo.email || null
      });
      alert("✅ Hotel info updated.");
    } catch (err) {
      console.error("❌ Update failed:", err.message);
      alert("❌ Failed to update hotel info.");
    }
  };

  const handleInsertRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/manage/room', {
        hotelId: Number(insertRoomData.hotelId),
        roomNumber: Number(insertRoomData.roomNumber),
        capacity: Number(insertRoomData.capacity),
        price: Number(insertRoomData.price),
        viewType: insertRoomData.viewType,
        availability: insertRoomData.availability,
        isExtendable: insertRoomData.isExtendable
      });
      alert("✅ Room inserted successfully");
    } catch (err) {
      console.error("❌ Error inserting room:", err.message);
      alert("❌ Failed to insert room.");
    }
  };

  const handleFindRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5001/api/manage/room/${roomSearch.hotelId}/${roomSearch.roomNumber}`);
      setRoomUpdateInfo(res.data);
    } catch (err) {
      setRoomUpdateInfo(null);
      alert("❌ Room not found.");
      console.error("Error fetching room:", err.message);
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/manage/room/${roomSearch.hotelId}/${roomSearch.roomNumber}`, {
        capacity: Number(roomUpdateInfo.capacity),
        price: Number(roomUpdateInfo.price),
        availability: roomUpdateInfo.availability,
        isExtendable: roomUpdateInfo.isExtendable
      });
      alert("✅ Room updated successfully");
    } catch (err) {
      console.error("❌ Error updating room:", err.message);
      alert("❌ Failed to update room.");
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await axios.delete('http://localhost:5001/api/manage/room', {
        data: {
          hotelId: Number(roomSearch.hotelId),
          roomNumber: Number(roomSearch.roomNumber)
        }
      });
      setRoomUpdateInfo(null);
      alert("🗑️ Room deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting room:", err.message);
      alert("❌ Failed to delete room.");
    }
  };

  return (
    <div className="manage-container">
      <h2>🏨 Update Hotel Info</h2>
      <form className="form-group" onSubmit={handleFindHotel}>
        <input
          type="number"
          placeholder="Enter Hotel ID"
          value={hotelIdToUpdate}
          onChange={(e) => setHotelIdToUpdate(e.target.value)}
          required
        />
        <button type="submit">Find</button>
      </form>

      {hotelInfo && (
        <form className="form-group" onSubmit={handleUpdateHotel}>
          <input
            type="number"
            name="starRating"
            placeholder="Star Rating (1-5)"
            value={hotelInfo.starRating}
            onChange={handleHotelInfoChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={hotelInfo.phone}
            onChange={handleHotelInfoChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={hotelInfo.email}
            onChange={handleHotelInfoChange}
          />
          <button type="submit">Update Hotel Info</button>
        </form>
      )}

      <hr />

      <h2>➕ Insert New Room</h2>
      <form className="form-group" onSubmit={handleInsertRoom}>
        <input type="number" name="hotelId" placeholder="Hotel ID" value={insertRoomData.hotelId} onChange={handleInsertRoomChange} required />
        <input type="number" name="roomNumber" placeholder="Room Number" value={insertRoomData.roomNumber} onChange={handleInsertRoomChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={insertRoomData.capacity} onChange={handleInsertRoomChange} required />
        <input type="number" name="price" placeholder="Price" value={insertRoomData.price} onChange={handleInsertRoomChange} required />
        <input type="text" name="viewType" placeholder="View Type (e.g. Sea View)" value={insertRoomData.viewType} onChange={handleInsertRoomChange} />
        <label>
          <input type="checkbox" name="availability" checked={insertRoomData.availability} onChange={handleInsertRoomChange} /> Available
        </label>
        <label>
          <input type="checkbox" name="isExtendable" checked={insertRoomData.isExtendable} onChange={handleInsertRoomChange} /> Extendable
        </label>
        <button type="submit">Insert Room</button>
      </form>

      <hr />

      <h2>🔁 Update or Delete Existing Room</h2>
      <div className="form-group" style={{ flexDirection: 'row', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="number"
          name="hotelId"
          placeholder="Hotel ID"
          value={roomSearch.hotelId}
          onChange={handleRoomSearchChange}
          required
          style={{ flex: 1 }}
        />
        <input
          type="number"
          name="roomNumber"
          placeholder="Room Number"
          value={roomSearch.roomNumber}
          onChange={handleRoomSearchChange}
          required
          style={{ flex: 1 }}
        />
      </div>
      <div className="form-group" style={{ flexDirection: 'row', gap: '12px' }}>
        <button type="button" onClick={handleFindRoom} style={{ flex: 1 }}>Find Room</button>
        <button type="button" onClick={handleDeleteRoom} style={{ flex: 1 }}>Delete Room</button>
      </div>

      {roomUpdateInfo && (
        <form className="form-group" onSubmit={handleUpdateRoom}>
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={roomUpdateInfo.capacity}
            onChange={handleRoomUpdateChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={roomUpdateInfo.price}
            onChange={handleRoomUpdateChange}
          />
          <label>
            <input type="checkbox" name="availability" checked={roomUpdateInfo.availability} onChange={handleRoomUpdateChange} /> Available
          </label>
          <label>
            <input type="checkbox" name="isExtendable" checked={roomUpdateInfo.isExtendable} onChange={handleRoomUpdateChange} /> Extendable
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ flex: 1 }}>Update Room</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManagePage;
