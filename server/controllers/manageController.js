const pool = require("../db");

// Get hotel info by ID (for updating)
const getHotelInfo = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const result = await pool.query(
      `SELECT h.Star_Rating, 
              p.Phone_Number, 
              e.Email
       FROM Hotel h
       LEFT JOIN Phone_Number p ON h.Hotel_ID = p.Hotel_ID
       LEFT JOIN Email e ON h.Hotel_ID = e.Hotel_ID
       WHERE h.Hotel_ID = $1`,
      [hotelId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const hotel = result.rows[0];
    res.json({
      starRating: hotel.star_rating,
      phone: hotel.phone_number,
      email: hotel.email
    });
  } catch (err) {
    console.error("❌ Error fetching hotel info:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update hotel star rating, phone, and email
const updateHotelInfo = async (req, res) => {
  const hotelId = req.params.id;
  const { starRating, phone, email } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE Hotel SET Star_Rating = $1 WHERE Hotel_ID = $2`,
      [starRating, hotelId]
    );

    const phoneCheck = await client.query(
      `SELECT * FROM Phone_Number WHERE Hotel_ID = $1`,
      [hotelId]
    );

    if (phoneCheck.rows.length > 0) {
      await client.query(
        `UPDATE Phone_Number SET Phone_Number = $1 WHERE Hotel_ID = $2`,
        [phone, hotelId]
      );
    } else {
      await client.query(
        `INSERT INTO Phone_Number (Phone_Number, Hotel_Chain_ID, Hotel_ID) VALUES ($1, NULL, $2)`,
        [phone, hotelId]
      );
    }

    const emailCheck = await client.query(
      `SELECT * FROM Email WHERE Hotel_ID = $1`,
      [hotelId]
    );

    if (emailCheck.rows.length > 0) {
      await client.query(
        `UPDATE Email SET Email = $1 WHERE Hotel_ID = $2`,
        [email, hotelId]
      );
    } else {
      await client.query(
        `INSERT INTO Email (Email, Hotel_Chain_ID, Hotel_ID) VALUES ($1, NULL, $2)`,
        [email, hotelId]
      );
    }

    await client.query("COMMIT");
    res.json({ message: "✅ Hotel info updated." });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error updating hotel info:", err.message);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Insert Room
const insertRoom = async (req, res) => {
  const {
    hotelId,
    roomNumber,
    capacity,
    price,
    viewType,
    availability,
    isExtendable,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Room
       (Room_Number, Hotel_ID, Capacity, Price, View_Type, Availability, Is_Extendable)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [roomNumber, hotelId, capacity, price, viewType, availability, isExtendable]
    );
    res.status(201).json({ message: "✅ Room inserted successfully." });
  } catch (err) {
    console.error("❌ Error inserting room:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteRoom = async (req, res) => {
    const { hotelId, roomNumber } = req.body;
  
    try {
      const result = await pool.query(
        `DELETE FROM Room WHERE Hotel_ID = $1 AND Room_Number = $2 RETURNING *`,
        [hotelId, roomNumber]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Room not found or already deleted." });
      }
  
      res.json({ message: "🗑️ Room deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting room:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

// Get room info by Hotel_ID and Room_Number
const getRoomInfo = async (req, res) => {
  const { hotelId, roomNumber } = req.params;

  try {
    const result = await pool.query(
      `SELECT Capacity, Price, Availability, Is_Extendable 
       FROM Room 
       WHERE Hotel_ID = $1 AND Room_Number = $2`,
      [hotelId, roomNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    const room = result.rows[0];
    res.json({
      capacity: room.capacity,
      price: room.price,
      availability: room.availability,
      isExtendable: room.is_extendable
    });
  } catch (err) {
    console.error("❌ Error fetching room info:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateRoom = async (req, res) => {
    const { hotelId, roomNumber } = req.params;
    const { capacity, price, availability, isExtendable } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE Room
         SET Capacity = $1, Price = $2, Availability = $3, Is_Extendable = $4
         WHERE Hotel_ID = $5 AND Room_Number = $6`,
        [capacity, price, availability, isExtendable, hotelId, roomNumber]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Room not found." });
      }
  
      res.json({ message: "✅ Room updated successfully." });
    } catch (err) {
      console.error("❌ Error updating room:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
  getHotelInfo,
  updateHotelInfo,
  insertRoom,
  deleteRoom,
  getRoomInfo,
  updateRoom,
};
