const pool = require('../db');

const searchRooms = async (req, res) => {
  const {
    startDate,
    endDate,
    capacity,
    city,
    area,
    hotelChain,
    category,
    priceMin,
    priceMax,
  } = req.body;

  try {
    const result = await pool.query(
      `
      SELECT r.*, h.address, h.star_rating, hc.name AS hotel_chain_name
      FROM Room r
      JOIN Hotel h ON r.hotel_id = h.hotel_id
      JOIN Hotel_Chain hc ON h.hotel_chain_id = hc.hotel_chain_id
      WHERE r.capacity = $1
      AND r.availability = TRUE
      AND ($2::TEXT IS NULL OR h.address ILIKE $2) -- area
      AND ($3::TEXT IS NULL OR hc.name = $3)      -- hotelChain
      AND ($4::INT IS NULL OR h.star_rating = $4) -- category/stars
      AND ($5::NUMERIC IS NULL OR r.price >= $5)
      AND ($6::NUMERIC IS NULL OR r.price <= $6)
      AND NOT EXISTS (
        SELECT 1 FROM Booking b
        WHERE b.hotel_id = r.hotel_id
        AND b.room_number = r.room_number
        AND b.start_date < $8
        AND b.end_date > $7
      )
      `,
      [
        capacity || 1,
        area ? `%${area}%` : null,
        hotelChain || null,
        category || null,
        priceMin || null,
        priceMax || null,
        startDate,
        endDate,
      ]
    );

    res.json({
      totalRoomsAvailable: result.rows.length,
      rooms: result.rows,
    });
  } catch (err) {
    console.error('Room search failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};
const bookRoom = async (req, res) => {
  const { customerId, hotelId, roomNumber, startDate, endDate } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insert the booking
    const bookingResult = await client.query(
      `INSERT INTO Booking (Customer_ID, Hotel_ID, Room_Number, Start_Date, End_Date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [customerId, hotelId, roomNumber, startDate, endDate]
    );

    const booking = bookingResult.rows[0];

    // 2. Update the room's availability to false
    await client.query(
      `UPDATE Room
       SET Availability = FALSE
       WHERE Hotel_ID = $1 AND Room_Number = $2`,
      [hotelId, roomNumber]
    );

    // 3. Insert into Hotel_Transaction
    await client.query(
      `INSERT INTO Hotel_Transaction 
       (Employee_ID, Booking_ID, Renting_ID, Transaction_Type, Customer_ID, Hotel_ID, Room_Number)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        null,                        // Employee_ID = null (system-generated)
        booking.booking_id,          // Booking_ID
        null,                        // Renting_ID = null (not a renting)
        'Booking',                   // Transaction type
        customerId,                  // Customer_ID
        hotelId,                     // Hotel_ID
        roomNumber                   // Room_Number
      ]
    );

    await client.query('COMMIT');
    res.status(201).json({ success: true, booking });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Booking failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
};


module.exports = { searchRooms, bookRoom  };